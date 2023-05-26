var nestedSortables = document.getElementById("main");
new Sortable(nestedSortables, {
    group: "shared",
    handle: ".handle-section",
    animation: 200,
    nested: true,
    onEnd: function (event) {
        // Get the updated positions of the sections
        console.log("nested Sortables :", nestedSortables);
        var sections = document.getElementsByClassName("section");
        console.log("sections :", sections);
        var sectionPositions = Array.from(sections).map(function (
            section,
            index
        ) {
            return {
                sectionId: section.dataset.sectionId,
                position: index + 1,
            };
        });
        console.log("Section Positions", sectionPositions);
        // Send the updated positions to the server
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        $.ajax({
            url: "/updateSectionPosition", // Update with the appropriate URL
            type: "PUT",
            dataType: "json",
            data: JSON.stringify(sectionPositions),
            contentType: "application/json",
            success: function (response) {
                console.log("Section positions updated successfully");
            },
            error: function (xhr, status, error) {
                console.error("Error updating section positions:", error);
            },
        });
    },
});

document.getElementById("btn").addEventListener("click", function () {
    // create the ul element
    var newUls = document.createElement("ul");
    newUls.className = "section-list";

    // create the li element
    var newLi = document.createElement("li");
    newLi.className = "section";

    // create the icon handler:
    var newIcon = document.createElement("i");
    newIcon.className = "fa fa-bars handle-section";
    // create the div element
    var newDiv = document.createElement("div");
    newDiv.id = "section-box";
    newDiv.style = "display: inline;";
    newDiv.innerHTML =
        "<input value='New Section' class='input-section' type='text' ><button class='button save-button_sec'>Save</button><a  class='button cancel-button_sec'>Cancel</a>";

    // create the button to add a lesson:
    var newBtn = document.createElement("button");
    newBtn.id = "btn-el";
    newBtn.className = "btn";
    newBtn.innerHTML = "+ Add Lesson";

    // create the ul that will take the lessons
    var newUl = document.createElement("ul");
    newUl.className = "lesson-list";

    // add all the elements to the ul element with id section-list.
    var section_item = document.getElementById("main");

    // var lastSection = document.getElementById("body");
    section_item.appendChild(newUls);
    newUls.appendChild(newLi);
    newLi.append(newIcon, newDiv, newUl);
    newUl.appendChild(newBtn);

    new Sortable(section_item, {
        group: "shared",
        handle: ".handle-section",
        animation: 200,
        nested: true,
    });
    var newInputSection = newDiv.querySelector(".input-section");
    newInputSection.focus();
    newInputSection.select();
    // Smooth scroll to the newInputSection element

    newInputSection.scrollIntoView({ behavior: "smooth" });

    // Get the section name from the input field
    var sectionName = newInputSection.value;
    var sectionPosition = section_item.querySelectorAll(".section-list").length;
    console.log("existing sections", sectionPosition);

    // Create an object with the section data
    var sectionData = {
        sectionName: sectionName,
        position: sectionPosition, // Assign the position
    };

    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    var sectionId;
    // Send the section data to the server
    $.ajax({
        url: "/saveSection", // Update with the appropriate URL
        type: "POST",
        dataType: "json",
        data: JSON.stringify(sectionData),
        contentType: "application/json",
        success: function (response) {
            // Handle the response from the server
            sectionId = response.sectionId;
            console.log("section saved successfully", sectionId);
            newLi.setAttribute("data-section-id", sectionId);
            newBtn.addEventListener("click", function () {
                // create the li element
                var newLi1 = document.createElement("li");
                newLi1.className = "lesson";
                var newDiv1 = document.createElement("div");
                newDiv1.id = "lesson-box";
                newDiv1.style = "display: inline;";
                newDiv1.innerHTML =
                    "<input value='New Lesson' class='input' type='text' name='' ><button class='button save-button'>Save</button><a href='' class='button cancel-button'>Cancel</a>";
                // add all the elements to the ul element with id section-list.
                var currentLi = newUl.parentElement;
                var lessonList =
                    currentLi.getElementsByClassName("lesson-list");
                var lastLesson = lessonList[lessonList.length - 1];
                lastLesson.appendChild(newLi1);
                newLi1.appendChild(newDiv1);
                var newInput = newDiv1.querySelector(".input");
                newInput.focus();
                newInput.select();
                // Get the lesson name from the input field

                var lessonName = newInput.value;
                console.log(lessonName);
                console.log(sectionId);
                // Create an object with the lesson data

                $.ajaxSetup({
                    headers: {
                        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                            "content"
                        ),
                    },
                });
                var lessonPosition = newUl.querySelectorAll(".lesson").length;

                // Create an object with the lesson data
                var lessonData = {
                    lessonName: lessonName,
                    sectionId: sectionId,
                    position: lessonPosition, // Assign the position
                };
                var lessonId;
                // Send the lesson data to the server
                $.ajax({
                    url: "/saveLesson", // Update with the appropriate URL
                    type: "POST",
                    dataType: "json",
                    data: JSON.stringify(lessonData),
                    contentType: "application/json",
                    success: function (response) {
                        // Handle the response from the server
                        lessonId = response.lessonId;
                        console.log("Lesson saved", lessonId);
                        newLi1.setAttribute("data-lesson-id", lessonId);
                        // var buttons =
                        // document.querySelectorAll(".cancel-button");
                        // buttons.forEach(function (button) {
                        //     button.addEventListener("click", function () {
                        //         $.ajaxSetup({
                        //             // headers: {
                        //             //     "X-CSRF-TOKEN": $(
                        //             //         'meta[name="csrf-token"]'
                        //             //     ).attr("content"),
                        //             // },
                        //         });
                        //         // console.log(sectionID);
                        //         // var lessonId=lessonId;
                        //         // var sectionID =
                        //         // Send the lesson data to the server
                        //         console.log("this lesson id", lessonId);
                        //         $.ajax({
                        //             url: "/api/lessons/destroy/" + lessonId, // Update with the appropriate URL
                        //             type: "DELETE",
                        //             dataType: "json",
                        //             headers: {
                        //                 "X-CSRF-TOKEN": "{{ csrf_token() }}",
                        //             },
                        //             data: {
                        //                 lessonId: lessonId,
                        //             },
                        //             contentType: "application/json",
                        //             success: function (response) {
                        //                 // // Handle the response from the server
                        //                 // sectionId = response.sectionId;
                        //                 var li = button.closest(".lesson");
                        //                 li.remove();
                        //                 // newLi1.setAttribute("data-lesson-id", sectionId);
                        //                 console.log(
                        //                     "deleted successfully",
                        //                     response
                        //                 );
                        //             },
                        //             error: function (xhr, status, error) {
                        //                 // Handle any errors
                        //                 console.log("xhr", xhr);
                        //                 console.log("status", status);
                        //                 console.error(
                        //                     "Error saving lesson:",
                        //                     error
                        //                 );
                        //             },
                        //         });
                        //     });
                        // });
                    },
                    error: function (xhr, status, error) {
                        // Handle any errors
                        console.log("xhr", xhr);
                        console.log("status", status);
                        console.error("Error saving lesson:", error);
                    },
                });

                var buttons = document.querySelectorAll(".save-button");
                buttons.forEach(function (button) {
                    button.addEventListener("click", function () {
                        var row = button.parentNode;
                        var nameInput = row.querySelector(".input");
                        var name = nameInput.value;
                        // Create an object to send the data
                        var link = document.createElement("span");
                        link.textContent = name;
                        link.className = "lesson-link";
                        var publish_btn = document.createElement("a");
                        publish_btn.href = "#";
                        publish_btn.textContent = "action";
                        publish_btn.className = "publish-btn";
                        row.replaceWith(link, publish_btn);
                        // console.log(lessonId);
                        // console.log(name);
                        $.ajax({
                            url: "/api/lessons/" + lessonId,
                            type: "PUT",
                            headers: {
                                "X-CSRF-TOKEN": "{{ csrf_token() }}", // Add this line if you're using Laravel's CSRF protection
                            },
                            dataType: "json",
                            data: {
                                name: name,
                            },
                            success: function (data) {
                                // Update the section name in the UI
                                console.log("suuccessuful update lesson name");
                            },
                            error: function (error) {
                                console.error(error);
                            },
                        });
                    });
                });
                /**************************************** cancel lessen */

                // var buttons = document.querySelectorAll(".cancel-button");
                // buttons.forEach(function (button) {
                //     button.addEventListener("click", function () {
                //         $.ajaxSetup({
                //             headers: {
                //                 "X-CSRF-TOKEN": $(
                //                     'meta[name="csrf-token"]'
                //                 ).attr("content"),
                //             },
                //         });
                //         // console.log(sectionID);
                //         // var lessonId=lessonId;
                //         // var sectionID =
                //         // Send the lesson data to the server
                //         var li = button.closest(".lesson");
                //         var lessonID = li.dataset.lessonId;
                //         console.log("this lesson id", lessonID);
                //         $.ajax({
                //             url: "/api/lessons/destroy/" + lessonID, // Update with the appropriate URL
                //             type: "DELETE",
                //             dataType: "json",
                //             // headers: {
                //             //     "X-CSRF-TOKEN": "{{ csrf_token() }}",
                //             // },
                //             data: {
                //                 lessonId: lessonID,
                //             },
                //             contentType: "application/json",
                //             success: function (response) {
                //                 // Handle the response from the server
                //                 // sectionId = response.sectionId;
                //                 // var li = button.closest(".lesson");
                //                 li.remove();
                //                 // newLi1.setAttribute("data-lesson-id", sectionId);
                //                 console.log("deleted successfully", response);
                //                 // while (true) {
                //                 //     console.log("egeg",lessonID);
                //                 // }
                //             },
                //             error: function (xhr, status, error) {
                //                 // Handle any errors
                //                 console.log("xhr", xhr);
                //                 console.log("status", status);
                //                 console.error("Error saving lesson:", error);
                //             },
                //         });
                //     });
                // });
            });
        },

        error: function (xhr, status, error) {
            // Handle any errors
            console.log("xhr", xhr);
            console.log("status", status);
            console.error("Error saving section:", error);
        },
    });

    // ///////////////////////////////////////////////////////////////::
    // to save the name of the section inserted by the user
    var buttons1 = document.querySelectorAll(".save-button_sec");
    buttons1.forEach(function (button) {
        button.addEventListener("click", function () {
            var row = button.parentElement;
            var span = document.createElement("span");
            span.id = "section-title";
            var sectionNm = newInputSection.value;
            span.textContent = sectionNm;
            var quick_action_button = document.createElement("a");
            quick_action_button.href = "#";
            quick_action_button.textContent = "Quick Action";
            quick_action_button.className = "section-h-btn";
            row.replaceWith(span, quick_action_button);

            $.ajax({
                url: "/api/sections/" + sectionId,
                type: "PUT",
                headers: {
                    "X-CSRF-TOKEN": "{{ csrf_token() }}", // Add this line if you're using Laravel's CSRF protection
                },
                dataType: "json",
                data: {
                    name: sectionNm,
                },
                success: function (data) {
                    // Update the section name in the UI
                    console.log("suuccessuful update section name");
                },
                error: function (error) {
                    console.error(error);
                },
            });
        });
    });

    var buttons = document.querySelectorAll(".cancel-button_sec");
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            $.ajaxSetup({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                        "content"
                    ),
                },
            });
            // console.log(sectionID);
            // var lessonId;
            // var sectionID =
            // Send the lesson data to the server
            console.log("this section id", sectionId);

            $.ajax({
                url: "/api/sections/destroy/" + sectionId, // Update with the appropriate URL
                type: "DELETE",
                dataType: "json",

                headers: {
                    "X-CSRF-TOKEN": "{{ csrf_token() }}",
                },

                data: {
                    sectionId: sectionId,
                },
                contentType: "application/json",
                success: function (response) {
                    // // Handle the response from the server
                    // sectionId = response.sectionId;
                    var li = button.closest(".section");
                    li.remove();
                    // newLi1.setAttribute("data-lesson-id", sectionId);
                    console.log("deleted successfully", response);
                },
                error: function (xhr, status, error) {
                    // Handle any errors
                    console.log("xhr", xhr);

                    console.log("status", status);
                    console.error("Error saving lesson:", error);
                },
            });
        });
    });
    
});

// add elemlents in already exists sections  buttons
var addBtns = document.querySelectorAll(".btn-el");
addBtns.forEach(function (addBtn) {
    addBtn.addEventListener("click", function () {
        console.log(addBtn);
        var ul = addBtn.parentElement;
        var newLi1 = document.createElement("li");
        newLi1.className = "lesson";

        // create the div element
        var newDiv1 = document.createElement("div");
        newDiv1.id = "lesson-box";
        newDiv1.style = "display: inline;";
        newDiv1.innerHTML =
            "<input value='New Lesson' class='input' type='text' name='' ><button class='button save-button'>Save</button><a href='' class='button cancel-button'>Cancel</a>";
        ul.appendChild(newLi1);
        newLi1.appendChild(newDiv1);
        var newInput = newDiv1.querySelector(".input");
        newInput.focus();
        newInput.select();
        // Get the lesson name from the input field

        var lessonName = newInput.value;
        var sectionID = ul.dataset.sectionId;
        console.log("section id : ", sectionID);
        var lessonPosition = ul.querySelectorAll(".lesson").length;
        console.log("position : ", lessonPosition);

        var lessonData = {
            lessonName: lessonName,
            sectionId: sectionID,
            position: lessonPosition,
        };
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        console.log(sectionID);
        var lessonId;
        // Send the lesson data to the server
        $.ajax({
            url: "/saveLesson", // Update with the appropriate URL
            type: "POST",
            dataType: "json",
            data: JSON.stringify(lessonData),
            contentType: "application/json",
            success: function (response) {
                // Handle the response from the server
                lessonId = response.lessonId;
                console.log("Lesson saved", lessonId);
                newLi1.setAttribute("data-lesson-id", lessonId);
            },
            error: function (xhr, status, error) {
                // Handle any errors
                console.log("xhr", xhr);
                console.log("status", status);
                console.error("Error saving lesson:", error);
            },
        });

        var buttons = document.querySelectorAll(".save-button");
        buttons.forEach(function (button) {
            button.addEventListener("click", function () {
                var row = button.parentNode;
                var nameInput = row.querySelector(".input");
                var name = nameInput.value;
                // Create an object to send the data

                var link = document.createElement("span");
                link.textContent = name;
                link.className = "lesson-link";
                var publish_btn = document.createElement("a");
                publish_btn.href = "#";
                publish_btn.textContent = "Publish";
                publish_btn.className = "publish-btn";
                row.replaceWith(link, publish_btn);

                ////////////://///////////////////////////////////////
                $.ajax({
                    url: "/api/lessons/" + lessonId,
                    type: "PUT",
                    headers: {
                        "X-CSRF-TOKEN": "{{ csrf_token() }}", // Add this line if you're using Laravel's CSRF protection
                    },
                    dataType: "json",
                    data: {
                        name: name,
                    },
                    success: function (data) {
                        // Update the section name in the UI
                        console.log("suuccessuful update section name");
                    },
                    error: function (error) {
                        console.error(error);
                    },
                });
            });
        });

        var buttons = document.querySelectorAll(".cancel-button");
        buttons.forEach(function (button) {
            button.addEventListener("click", function () {
                $.ajaxSetup({
                    headers: {
                        "X-CSRF-TOKEN": $(
                            'meta[name="csrf-token"]'
                        ).attr("content"),
                    },
                });
                // console.log(sectionID);
                // var lessonId=lessonId;
                // var sectionID =
                // Send the lesson data to the server
                var li = button.closest(".lesson");
                var lessonID = li.dataset.lessonId;
                console.log("this lesson id", lessonID);
                $.ajax({
                    url: "/api/lessons/destroy/" + lessonID, // Update with the appropriate URL
                    type: "DELETE",
                    dataType: "json",
                    // headers: {
                    //     "X-CSRF-TOKEN": "{{ csrf_token() }}",
                    // },
                    data: {
                        lessonId: lessonID,
                    },
                    contentType: "application/json",
                    success: function (response) {
                        // Handle the response from the server
                        // sectionId = response.sectionId;
                        // var li = button.closest(".lesson");
                        li.remove();
                        // newLi1.setAttribute("data-lesson-id", sectionId);
                        console.log("deleted successfully", response);
                        // while (true) {
                        //     console.log("egeg",lessonID);
                        // }
                    },
                    error: function (xhr, status, error) {
                        // Handle any errors
                        console.log("xhr", xhr);
                        console.log("status", status);
                        console.error("Error saving lesson:", error);
                    },
                });
            });
        });
    });
});
