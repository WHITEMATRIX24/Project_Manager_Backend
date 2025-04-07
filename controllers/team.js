const Team = require("../models/team");
const User = require("../models/users");

const getTeamController = async (req, res) => {
    try {
        const teams = await Team.find().populate('team_members');
        res.json(teams);
    } catch (error) {
        console.error("Error fetching teams:", error); // log the real error
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const createTeamController = async (req, res) => {
    try {
        const { team_members } = req.body;
        if (!Array.isArray(team_members) || team_members.length === 0) {
            return res.status(400).json({ message: "Team members are required" });
        }
        const existingUsers = await User.find({ _id: { $in: team_members } });
        if (existingUsers.length !== team_members.length) {
            return res.status(404).json({ message: "some user id are invalid" });
        }
        const newTeam = new Team({ team_members });
        const savedTeam = await newTeam.save();
        res.status(200).json(savedTeam);
    } catch (error) {
        console.error("Error creating team:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
const updateTeamController = async (req, res) => {
    try {
        const { teamId } = req.params;
        const { add_members = [], remove_members = [] } = req.body;

        const team = await Team.findById(teamId);
        if (!team) return res.status(404).json({ message: "Team not found" });

        const updatedMembers = new Set(team.team_members.map(id => id.toString()));

        add_members.forEach(id => updatedMembers.add(id));
        remove_members.forEach(id => updatedMembers.delete(id));

        team.team_members = Array.from(updatedMembers);
        const updatedTeam = await team.save();

        res.status(200).json({ message: "Team updated", team: updatedTeam });
    } catch (error) {
        console.error("Error updating team:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
const deleteTeamController = async (req, res) => {
    try {
        const { teamId } = req.params;

        const deletedTeam = await Team.findByIdAndDelete(teamId);

        if (!deletedTeam) {
            return res.status(404).json({ message: "Team not found" });
        }

        res.status(200).json({ message: "Team deleted successfully", team: deletedTeam });
    } catch (error) {
        console.error("Error deleting team:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
module.exports = {
    getTeamController,
    createTeamController,
    updateTeamController,
    deleteTeamController,
};
