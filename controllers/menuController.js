const MenuItem = require("../models/MenuItem");
const createMenuItem = async (req, res) => {
try {
const menuItem = await MenuItem.create(req.body);
res.status(201).json(menuItem);
} catch (error) {
res.status(400).json({ error: error.message });
}
};
const getAllMenuItems = async (req, res) => {
try {
const filter = {};
if (req.query.category) {
filter.category = req.query.category;
}
if (req.query.available) {
filter.available = req.query.available === "true";
}
const menuItems = await MenuItem.find(filter);
res.status(200).json(menuItems);
} catch (error) {
res.status(500).json({ error: error.message });
}
};
const getMenuItemById = async (req, res) => {
try {
const menuItem = await MenuItem.findById(req.params.id);
if (!menuItem) {
return res.status(404).json({ error: "Menu item not found" });
}
res.status(200).json(menuItem);
} catch (error) {
res.status(500).json({ error: error.message });
}
};
const updateMenuItem = async (req, res) => {
try {
const menuItem = await MenuItem.findByIdAndUpdate(
req.params.id,
req.body,
{
new: true,
runValidators: true
}
);
if (!menuItem) {
return res.status(404).json({ error: "Menu item not found" });
}
res.status(200).json(menuItem);
} catch (error) {
res.status(400).json({ error: error.message });
}
};
const deleteMenuItem = async (req, res) => {
try {
const menuItem = await MenuItem.findByIdAndDelete(req.params.id);

if (!menuItem) {
return res.status(404).json({ error: "Menu item not found" });
}
res.status(200).json({ message: "Menu item deleted successfully" });
} catch (error) {
res.status(500).json({ error: error.message });
}
};
6
module.exports = {
createMenuItem,
getAllMenuItems,
getMenuItemById,
updateMenuItem,
deleteMenuItem
};