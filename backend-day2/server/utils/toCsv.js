module.exports = function toCsv(tasks) {
  const headers = ["id", "title", "status", "createdAt"];
  const rows = tasks.map((task) =>
    headers.map((h) => `"${task[h]}"`).join(",")
  );
  return [headers.join(","), ...rows].join("\n");
};
