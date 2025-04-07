const Module = require("../models/module");
const Project = require("../models/project");
const Task = require("../models/tasks");
//get all modules
const getModuleController = async (req, res) => {
    try {
        const modules = await Module.find()
            .populate({ path: 'project_id', select: 'name _id' });

        res.status(200).json(modules);
    } catch (error) {
        console.error("Error Fetching Modules", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
//function to build tree structure of module and task
const buildModuleTree = async (parentId = null) => {

    const modules = await Module.find({ parent_module_id: parentId }).lean();
    const moduleTree = await Promise.all(modules.map(async (mod) => {
        const children = await buildModuleTree(mod._id);
        let tasks = [];
        if (mod.is_leaf_node) {
            tasks = await Task.find({ parent_module_id: mod._id })
                .select('name description state priority due_date')
                .populate('assignee', 'name')
                .populate('assigned_to', 'name')
                .lean();
        }

        return {
            ...mod,
            children,
            ...(mod.is_leaf_node ? { tasks } : {})
        };
    }));

    return moduleTree;
};
//get all modules and task in tree structure
const getModuleTreeController = async (req, res) => {
    try {
        const moduleTree = await buildModuleTree(null);
        res.status(200).json(moduleTree);
    } catch (error) {
        console.error("Error building module tree:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
//create module 
const addModuleController = async (req, res) => {
    try {
        const {
            project_id,
            name,
            description,
            parent_module_id,
            start_date,
            end_date
        } = req.body;
        if (parent_module_id) {
            const parentModule = await Module.findById(parent_module_id);
            if (!parentModule) {
                return res.status(404).json({ message: "Parent module not found" });
            }
        }
        if (project_id) {
            const project = await Project.findById(project_id);
            if (!project) {
                return res.status(404).json({ message: "Project not found" });
            }
        }
        const newModule = new Module({
            project_id,
            name,
            description,
            parent_module_id: parent_module_id || null,
            start_date,
            end_date
        });

        await newModule.save();

        if (parent_module_id) {
            await Module.findByIdAndUpdate(parent_module_id, { is_leaf_node: false });
        }

        res.status(201).json({ message: "Module created successfully", module: newModule });
    } catch (error) {
        console.error("Error adding module:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
//update module
const editModuleController = async (req, res) => {
    try {
        const { moduleId } = req.params;
        const {
            name,
            description,
            start_date,
            end_date,
            parent_module_id
        } = req.body;

        const module = await Module.findById(moduleId);
        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }
        if (parent_module_id) {
            const parentModule = await Module.findById(parent_module_id);
            if (!parentModule) {
                return res.status(404).json({ message: "New parent module not found" });
            }
        }
        const previousParentId = module.parent_module_id;
        module.name = name ?? module.name;
        module.description = description ?? module.description;
        module.start_date = start_date ?? module.start_date;
        module.end_date = end_date ?? module.end_date;
        module.parent_module_id = parent_module_id ?? null;
        await module.save();
        if (parent_module_id && parent_module_id.toString() !== previousParentId?.toString()) {
            await Module.findByIdAndUpdate(parent_module_id, { is_leaf_node: false });
            if (previousParentId) {
                const siblings = await Module.find({ parent_module_id: previousParentId });
                if (siblings.length === 0) {
                    await Module.findByIdAndUpdate(previousParentId, { is_leaf_node: true });
                }
            }
        }

        res.status(200).json({ message: "Module updated successfully", module });
    } catch (error) {
        console.error("Error editing module:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
//delete module (only module with no children and task can be deleted)
const deleteModuleController = async (req, res) => {
    try {
        const { moduleId } = req.params;

        const module = await Module.findById(moduleId);
        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }
        const childModules = await Module.find({ parent_module_id: moduleId });
        if (childModules.length > 0) {
            return res.status(400).json({ message: "Cannot delete module. It has child modules." });
        }
        const tasks = await Task.find({ parent_module_id: moduleId });
        if (tasks.length > 0) {
            return res.status(400).json({ message: "Cannot delete module. It has associated tasks." });
        }
        await Module.findByIdAndDelete(moduleId);
        if (module.parent_module_id) {
            const siblings = await Module.find({ parent_module_id: module.parent_module_id });
            if (siblings.length === 0) {
                await Module.findByIdAndUpdate(module.parent_module_id, { is_leaf_node: true });
            }
        }
        res.status(200).json({ message: "Module deleted successfully" });
    } catch (error) {
        console.error("Error deleting module:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


module.exports = {
    getModuleController,
    getModuleTreeController,
    addModuleController,
    editModuleController,
    deleteModuleController,
};
