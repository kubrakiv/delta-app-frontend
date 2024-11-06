import Task from "../Task/Task";
import AddTaskButton from "../AddTaskButton/AddTaskButton";

function DayTasks({
  tasks,
  dayNumber,
  truckId,
  onTruckDateSelect,
  handleEndTime,
  handleStartTime,
  handleDeleteTask,
  handleEditModeTask,
}) {
  const hasTasks = tasks.length > 0;
  const week = true;

  return (
    <>
      {hasTasks &&
        tasks.map((task) => (
          <div key={task.id} style={{ width: "100%" }}>
            <Task
              task={task}
              handleEndTime={handleEndTime}
              handleStartTime={handleStartTime}
              handleDeleteTask={handleDeleteTask}
              handleEditModeTask={handleEditModeTask}
            />
          </div>
        ))}
      <AddTaskButton
        onTruckDateSelect={onTruckDateSelect}
        dayNumber={dayNumber}
        truckId={truckId}
        style={week}
      />
    </>
  );
}

export default DayTasks;
