let api_stream_camera = "stream_camera";
let api_stream_ai = "stream_ai";
let api_stream_data = "stream_data";
let api_stream_general = "stream_general";


// let element_id_stream_camera_color_video = "camera_stream_color_video";
// let stream_camera_color_video = null;

// let element_id_stream_camera_depth_video = "camera_stream_depth_video";
// let stream_camera_depth_video = null;

let element_id_stream_camera_color_img = "camera_stream_color_img";
let element_stream_camera_color_img = null;

let element_id_stream_camera_depth_img = "camera_stream_depth_img";
let element_stream_camera_depth_img = null;

let element_id_stream_ai_img = "ai_stream_img";
let element_stream_ai_img = null;

let element_id_ai_stream_toggle = "ai_stream_toggle";
let element_ai_stream_toggle = null;



console.log("SocketIO Connection to ", location.protocol + '//' + document.domain + ':' + location.port, " is established.");
let socket = io.connect(
    location.protocol + '//' + document.domain + ':' + location.port,
    { rememberTransport: false, transports: ['websocket'], upgrade: false }
);



document.addEventListener('DOMContentLoaded', (event) => {
    element_stream_camera_color_img = document.getElementById(element_id_stream_camera_color_img);
    element_stream_camera_depth_img = document.getElementById(element_id_stream_camera_depth_img);
    element_stream_ai_img = document.getElementById(element_id_stream_ai_img);
    element_ai_stream_toggle = document.getElementById(element_id_ai_stream_toggle);


    if (element_stream_camera_color_img === null) {
        console.log("Element Stream Camera Color Image: ", element_stream_camera_color_img);
    }
    else {
        console.error("Element Stream Camera Color Image: ", element_stream_camera_color_img);
    }
    if (element_stream_camera_depth_img === null) {
        console.log("Element Stream Camera Depth Image: ", element_stream_camera_depth_img);
    }
    else {
        console.error("Element Stream Camera Depth Image: ", element_stream_camera_depth_img);
    }
    if (element_stream_ai_img === null) {
        console.log("Element Stream AI Image: ", element_stream_ai_img);
    }
    else {
        console.error("Element Stream AI Image: ", element_stream_ai_img);
    }
    if (element_ai_stream_toggle === null) {
        console.log("Element Stream AI Toggle: ", element_ai_stream_toggle);
    }
    else {
        console.error("Element Stream AI Toggle: ", element_ai_stream_toggle);
    }

    // Server Listener
    // console.log("Opening socket on: ", api_stream_camera);
    // socket.on(api_stream_camera, function (data) {
    //     // Check if data is undefined
    //     if (data === undefined) {
    //         console.log("Received undefined frame from server socket on:", api_stream_camera);
    //     }
    //     else {
    //         if (element_stream_camera_color_img !== null) {
    //             element_stream_camera_color_img.src = 'data:image/jpeg;base64,' + data.color;
    //             // console.log("Received frame from server");
    //         }
    //         if (element_stream_camera_depth_img !== null) {
    //             element_stream_camera_depth_img.src = 'data:image/jpeg;base64,' + data.depth;
    //             // console.log("Received frame from server");
    //         }
    //     }
    // });
    // console.log("Opening socket on: ", api_stream_ai);
    // socket.on(api_stream_ai, function (data) {
    //     // Check if data is undefined
    //     if (data === undefined) {
    //         console.log("Received undefined frame from server socket on: ", api_stream_ai);
    //     }
    //     else {
    //         if (element_stream_ai_img !== null) {
    //             element_stream_ai_img.src = 'data:image/jpeg;base64,' + data.pose_image;
    //             // console.log("Received frame from server");
    //         }
    //     }
    // });

    element_ai_stream_toggle.addEventListener('change', function () {
        aiStreamEnabled = element_ai_stream_toggle.checked;
        if (aiStreamEnabled) {
            // console.log("Opening socket on: ", api_stream_ai);
            // socket.on(api_stream_ai, function (data) {
            //     // Check if data is undefined
            //     if (data === undefined) {
            //         console.log("Received undefined frame from server socket on: ", api_stream_ai);
            //     } else {
            //         if (element_stream_ai_img !== null) {
            //             element_stream_ai_img.src = 'data:image/jpeg;base64,' + data.pose_image;
            //         }
            //     }
            // });
            // console.log("Opening socket on: ", api_stream_data);
            // socket.on(api_stream_data, function (data) {
            //     // Check if data is undefined
            //     if (data === undefined) {
            //         console.log("Received undefined frame from server socket on: ", api_stream_data);
            //     } else {
            //         console.log("Pose Landmarks Points: ", data.pose_landmarks_points);
            //     }
            // });
            console.log("Opening socket on: ", api_stream_general);
            socket.on(api_stream_general, function (data) {
                // Check if data is undefined
                if (data === undefined) {
                    console.log("Received undefined frame from server socket on: ", api_stream_general);
                } else {
                    if (element_stream_ai_img !== null) {
                        element_stream_ai_img.src = 'data:image/jpeg;base64,' + data.pose_image;
                    }
                    console.log("Pose Landmarks Points: ", data.pose_landmarks_points);
                }
            });
        } else {
            // console.log("Closing socket on: ", api_stream_ai);
            // socket.off(api_stream_ai);
            // if (element_stream_ai_img !== null) {
            //     element_stream_ai_img.src = ""; // Clear the image
            // }
            // console.log("Closing socket on: ", api_stream_data);
            // socket.off(api_stream_data);
            console.log("Closing socket on: ", api_stream_general);
            socket.off(api_stream_general);
        }
    });

});
