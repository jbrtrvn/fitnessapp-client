import React, { useState, useEffect } from "react";
import { Button, Form, Container, ListGroup } from "react-bootstrap";
import Swal from "sweetalert2";

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [newWorkout, setNewWorkout] = useState({ name: "", duration: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch workouts from API
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/workouts/getMyWorkouts`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await response.json();
        if (data.workouts) {
          setWorkouts(data.workouts);
        } else {
          Swal.fire({
            title: "Info",
            text: data.message || "No workouts found.",
            icon: "info",
            confirmButtonText: "OK",
          });
        }
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: err.message || "An error occurred while fetching workouts.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    fetchWorkouts();
  }, []);

  const handleAddWorkout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/workouts/addWorkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(newWorkout),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add workout");
      }

      setNewWorkout({ name: "", duration: "" });

      Swal.fire({
        title: "Success!",
        text: "Workout added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.reload(); // Refresh the page to see the updated list
      });
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.message || "An error occurred while adding the workout.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleUpdateWorkout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/workouts/updateWorkout/${
          selectedWorkout._id
        }`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(selectedWorkout),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update workout");
      }

      setIsEditing(false);
      setSelectedWorkout(null);

      Swal.fire({
        title: "Success!",
        text: "Workout updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.reload(); // Refresh the page to see the updated list
      });
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.message || "An error occurred while updating the workout.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDeleteWorkout = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/workouts/deleteWorkout/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete workout");
      }

      Swal.fire({
        title: "Success!",
        text: "Workout deleted successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.reload(); // Refresh the page to see the updated list
      });
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.message || "An error occurred while deleting the workout.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleCompleteWorkoutStatus = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/workouts/completeWorkoutStatus/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status: "completed" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update workout status");
      }

      Swal.fire({
        title: "Success!",
        text: "Workout status updated to completed.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.reload(); 
      });
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text:
          err.message || "An error occurred while updating the workout status.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Container>
      <h1 className="my-4">Workouts</h1>

      <Form
        onSubmit={isEditing ? handleUpdateWorkout : handleAddWorkout}
        className="mb-4"
      >
        <Form.Group controlId="formWorkoutName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter workout name"
            value={isEditing ? selectedWorkout?.name : newWorkout.name}
            onChange={(e) =>
              isEditing
                ? setSelectedWorkout({
                    ...selectedWorkout,
                    name: e.target.value,
                  })
                : setNewWorkout({ ...newWorkout, name: e.target.value })
            }
            required
          />
        </Form.Group>
        <Form.Group controlId="formWorkoutDuration">
          <Form.Label>Duration</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter workout duration"
            value={isEditing ? selectedWorkout?.duration : newWorkout.duration}
            onChange={(e) =>
              isEditing
                ? setSelectedWorkout({
                    ...selectedWorkout,
                    duration: e.target.value,
                  })
                : setNewWorkout({ ...newWorkout, duration: e.target.value })
            }
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {isEditing ? "Update Workout" : "Add Workout"}
        </Button>
        {isEditing && (
          <Button
            variant="secondary"
            onClick={() => {
              setIsEditing(false);
              setSelectedWorkout(null);
            }}
            className="ms-2"
          >
            Cancel
          </Button>
        )}
      </Form>

      <ListGroup>
        {workouts.map((workout) => (
          <ListGroup.Item
            key={workout._id}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <h5>{workout.name}</h5>
              <p>Duration: {workout.duration}</p>
              <p>Status: {workout.status}</p>
            </div>
            <div>
              <Button
                variant="warning"
                className="me-2"
                onClick={() => {
                  setIsEditing(true);
                  setSelectedWorkout(workout);
                }}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDeleteWorkout(workout._id)}
              >
                Delete
              </Button>
              <Button
                variant="success"
                onClick={() => handleCompleteWorkoutStatus(workout._id)}
              >
                Complete
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Workouts;
