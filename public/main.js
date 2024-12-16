function deleteProject(id) {
    const result = confirm("Are you sure you want to delete this project?");
    console.log("main.js",result);
      if (result) {
        fetch(`/delete-project/${id}`, {
            method: "POST",
        })
        .then(res => {
            if (res.ok) {
                console.log("Project deleted successfully.");
                location.reload();  // You can optimize this to remove the element dynamically
            } else {
                console.error("Failed to delete the project:", res.statusText);
            }
        })
        .catch(error => {
            console.error("An error occurred:", error);
        });
    }
}
