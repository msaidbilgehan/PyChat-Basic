let api_stream_body_measurements = "stream_body_measurements";

// Elements and IDs
let element_id_stream_ai_img = "ai_stream_img";
element_stream_ai_img = null;

let element_id_ai_stream_3d = "ai_stream_3d";
element_ai_stream_3d = null;

let element_id_shoulder_flexion_left_2D = "shoulder_flexion_left_2D";
let element_shoulder_flexion_left_2D = null;
let element_id_shoulder_flexion_left_3D = "shoulder_flexion_left_3D";
let element_shoulder_flexion_left_3D = null;

let element_id_shoulder_flexion_right_2D = "shoulder_flexion_right_2D";
let element_shoulder_flexion_right_2D = null;
let element_id_shoulder_flexion_right_3D = "shoulder_flexion_right_3D";
let element_shoulder_flexion_right_3D = null;

let element_id_hip_extension_left_2D = "hip_extension_left_2D";
let element_hip_extension_left_2D = null;
let element_id_hip_extension_left_3D = "hip_extension_left_3D";
let element_hip_extension_left_3D = null;

let element_id_hip_extension_right_2D = "hip_extension_right_2D";
let element_hip_extension_right_2D = null;
let element_id_hip_extension_right_3D = "hip_extension_right_3D";
let element_hip_extension_right_3D = null;

let element_id_hip_flexion_left_2D = "hip_flexion_left_2D";
let element_hip_flexion_left_2D = null;
let element_id_hip_flexion_left_3D = "hip_flexion_left_3D";
let element_hip_flexion_left_3D = null;

let element_id_hip_flexion_right_2D = "hip_flexion_right_2D";
let element_hip_flexion_right_2D = null;
let element_id_hip_flexion_right_3D = "hip_flexion_right_3D";
let element_hip_flexion_right_3D = null;

let element_id_knee_extension_left_2D = "knee_extension_left_2D";
let element_knee_extension_left_2D = null;
let element_id_knee_extension_left_3D = "knee_extension_left_3D";
let element_knee_extension_left_3D = null;

let element_id_knee_extension_right_2D = "knee_extension_right_2D";
let element_knee_extension_right_2D = null;
let element_id_knee_extension_right_3D = "knee_extension_right_3D";
let element_knee_extension_right_3D = null;

let element_id_knee_flexion_left_2D = "knee_flexion_left_2D";
let element_knee_flexion_left_2D = null;
let element_id_knee_flexion_left_3D = "knee_flexion_left_3D";
let element_knee_flexion_left_3D = null;

let element_id_knee_flexion_right_2D = "knee_flexion_right_2D";
let element_knee_flexion_right_2D = null;
let element_id_knee_flexion_right_3D = "knee_flexion_right_3D";
let element_knee_flexion_right_3D = null;

let element_id_elbow_extension_left_2D = "elbow_extension_left_2D";
let element_elbow_extension_left_2D = null;
let element_id_elbow_extension_left_3D = "elbow_extension_left_3D";
let element_elbow_extension_left_3D = null;

let element_id_elbow_extension_right_2D = "elbow_extension_right_2D";
let element_elbow_extension_right_2D = null;
let element_id_elbow_extension_right_3D = "elbow_extension_right_3D";
let element_elbow_extension_right_3D = null;

let element_id_elbow_flexion_left_2D = "elbow_flexion_left_2D";
let element_elbow_flexion_left_2D = null;
let element_id_elbow_flexion_left_3D = "elbow_flexion_left_3D";
let element_elbow_flexion_left_3D = null;

let element_id_elbow_flexion_right_2D = "elbow_flexion_right_2D";
let element_elbow_flexion_right_2D = null;
let element_id_elbow_flexion_right_3D = "elbow_flexion_right_3D";
let element_elbow_flexion_right_3D = null;

let element_id_ankle_dorsiflexion_left_2D = "ankle_dorsiflexion_left_2D";
let element_ankle_dorsiflexion_left_2D = null;
let element_id_ankle_dorsiflexion_left_3D = "ankle_dorsiflexion_left_3D";
let element_ankle_dorsiflexion_left_3D = null;

let element_id_ankle_dorsiflexion_right_2D = "ankle_dorsiflexion_right_2D";
let element_ankle_dorsiflexion_right_2D = null;
let element_id_ankle_dorsiflexion_right_3D = "ankle_dorsiflexion_right_3D";
let element_ankle_dorsiflexion_right_3D = null;

let element_id_ankle_plantar_flexion_left_2D = "ankle_plantar_flexion_left_2D";
let element_ankle_plantar_flexion_left_2D = null;
let element_id_ankle_plantar_flexion_left_3D = "ankle_plantar_flexion_left_3D";
let element_ankle_plantar_flexion_left_3D = null;

let element_id_ankle_plantar_flexion_right_2D = "ankle_plantar_flexion_right_2D";
let element_ankle_plantar_flexion_right_2D = null;
let element_id_ankle_plantar_flexion_right_3D = "ankle_plantar_flexion_right_3D";
let element_ankle_plantar_flexion_right_3D = null;

let element_id_console = "console";
let element_console = null;

let layout_3d = {
    title: '3D Human Body Visualization',
    // autosize: true,
    scene: {
        xaxis: {title: 'X Axis'},
        yaxis: {title: 'Y Axis'},
        zaxis: {title: 'Z Axis'}
    },
    camera: {
        eye: {x: 1, y: 1, z: 2},  // Adjust these values to change the viewpoint
        up: {x: 1, y: 1, z: 1},            // This sets the Z-axis as 'up'
        center: {x: 0, y: 0, z: 0}         // Center at the origin
    }
};

console.log("SocketIO Connection to ", location.protocol + '//' + document.domain + ':' + location.port, " is established.");
let socket = io.connect(
    location.protocol + '//' + document.domain + ':' + location.port,
    { rememberTransport: false, transports: ['websocket'], upgrade: false }
);



document.addEventListener('DOMContentLoaded', (event) => {
    element_ai_stream_3d = document.getElementById(element_id_ai_stream_3d);

    // var data = [{
    //     x: [1, 2, 3],  // x coordinates of joints
    //     y: [1, 2, 3],  // y coordinates of joints
    //     z: [1, 2, 3],  // z coordinates of joints
    //     mode: 'markers+lines',
    //     marker: {
    //         size: 5,
    //         color: 'blue'
    //     },
    //     type: 'scatter3d'
    // }];
    Plotly.newPlot('bodyPlot', [], layout_3d);
    element_stream_ai_img = document.getElementById(element_id_stream_ai_img);

    element_shoulder_flexion_left_2D = document.getElementById(element_id_shoulder_flexion_left_2D);
    element_shoulder_flexion_left_3D = document.getElementById(element_id_shoulder_flexion_left_3D);

    element_shoulder_flexion_right_2D = document.getElementById(element_id_shoulder_flexion_right_2D);
    element_shoulder_flexion_right_3D = document.getElementById(element_id_shoulder_flexion_right_3D);

    element_hip_extension_left_2D = document.getElementById(element_id_hip_extension_left_2D);
    element_hip_extension_left_3D = document.getElementById(element_id_hip_extension_left_3D);

    element_hip_extension_right_2D = document.getElementById(element_id_hip_extension_right_2D);
    element_hip_extension_right_3D = document.getElementById(element_id_hip_extension_right_3D);

    element_hip_flexion_left_2D = document.getElementById(element_id_hip_flexion_left_2D);
    element_hip_flexion_left_3D = document.getElementById(element_id_hip_flexion_left_3D);

    element_hip_flexion_right_2D = document.getElementById(element_id_hip_flexion_right_2D);
    element_hip_flexion_right_3D = document.getElementById(element_id_hip_flexion_right_3D);

    element_knee_extension_left_2D = document.getElementById(element_id_knee_extension_left_2D);
    element_knee_extension_left_3D = document.getElementById(element_id_knee_extension_left_3D);

    element_knee_extension_right_2D = document.getElementById(element_id_knee_extension_right_2D);
    element_knee_extension_right_3D = document.getElementById(element_id_knee_extension_right_3D);

    element_knee_flexion_left_2D = document.getElementById(element_id_knee_flexion_left_2D);
    element_knee_flexion_left_3D = document.getElementById(element_id_knee_flexion_left_3D);

    element_knee_flexion_right_2D = document.getElementById(element_id_knee_flexion_right_2D);
    element_knee_flexion_right_3D = document.getElementById(element_id_knee_flexion_right_3D);

    element_elbow_extension_left_2D = document.getElementById(element_id_elbow_extension_left_2D);
    element_elbow_extension_left_3D = document.getElementById(element_id_elbow_extension_left_3D);

    element_elbow_extension_right_2D = document.getElementById(element_id_elbow_extension_right_2D);
    element_elbow_extension_right_3D = document.getElementById(element_id_elbow_extension_right_3D);

    element_elbow_flexion_left_2D = document.getElementById(element_id_elbow_flexion_left_2D);
    element_elbow_flexion_left_3D = document.getElementById(element_id_elbow_flexion_left_3D);

    element_elbow_flexion_right_2D = document.getElementById(element_id_elbow_flexion_right_2D);
    element_elbow_flexion_right_3D = document.getElementById(element_id_elbow_flexion_right_3D);

    element_ankle_dorsiflexion_left_2D = document.getElementById(element_id_ankle_dorsiflexion_left_2D);
    element_ankle_dorsiflexion_left_3D = document.getElementById(element_id_ankle_dorsiflexion_left_3D);

    element_ankle_dorsiflexion_right_2D = document.getElementById(element_id_ankle_dorsiflexion_right_2D);
    element_ankle_dorsiflexion_right_3D = document.getElementById(element_id_ankle_dorsiflexion_right_3D);

    element_ankle_plantar_flexion_left_2D = document.getElementById(element_id_ankle_plantar_flexion_left_2D);
    element_ankle_plantar_flexion_left_3D = document.getElementById(element_id_ankle_plantar_flexion_left_3D);

    element_ankle_plantar_flexion_right_2D = document.getElementById(element_id_ankle_plantar_flexion_right_2D);
    element_ankle_plantar_flexion_right_3D = document.getElementById(element_id_ankle_plantar_flexion_right_3D);

    element_console = document.getElementById(element_id_console);

    // Server Listener
    console.log("Opening socket on: ", api_stream_body_measurements);
    socket.on(api_stream_body_measurements, function (data) {
        // Check if data is undefined
        if (data === undefined) {
            console.log("Received undefined frame from server socket on: ", api_stream_body_measurements);
            element_console.innerHTML = "Data NOT Received";
        } else {
            element_console.innerHTML = "Data Received";
            // console.log("Pose Landmarks Points: ", data.pose_landmarks_points);

            if (data.pose_landmarks_points.landmarks !== undefined) {
                updatePlot(data.pose_landmarks_points.landmarks);
            }

            element_stream_ai_img.src = 'data:image/jpeg;base64,' + data.pose_image;

            element_shoulder_flexion_left_2D.innerHTML = data.pose_landmarks_points.shoulder_flexion.left["2D"];
            element_shoulder_flexion_left_3D.innerHTML = data.pose_landmarks_points.shoulder_flexion.left["3D"];

            element_shoulder_flexion_right_2D.innerHTML = data.pose_landmarks_points.shoulder_flexion.right["2D"];
            element_shoulder_flexion_right_3D.innerHTML = data.pose_landmarks_points.shoulder_flexion.right["3D"];

            element_hip_extension_left_2D.innerHTML = data.pose_landmarks_points.hip_extension.left["2D"];
            element_hip_extension_left_3D.innerHTML = data.pose_landmarks_points.hip_extension.left["3D"];

            element_hip_extension_right_2D.innerHTML = data.pose_landmarks_points.hip_extension.right["2D"];
            element_hip_extension_right_3D.innerHTML = data.pose_landmarks_points.hip_extension.right["3D"];

            element_hip_flexion_left_2D.innerHTML = data.pose_landmarks_points.hip_flexion.left["2D"];
            element_hip_flexion_left_3D.innerHTML = data.pose_landmarks_points.hip_flexion.left["3D"];

            element_hip_flexion_right_2D.innerHTML = data.pose_landmarks_points.hip_flexion.right["2D"];
            element_hip_flexion_right_3D.innerHTML = data.pose_landmarks_points.hip_flexion.right["3D"];

            element_knee_extension_left_2D.innerHTML = data.pose_landmarks_points.knee_extension.left["2D"];
            element_knee_extension_left_3D.innerHTML = data.pose_landmarks_points.knee_extension.left["3D"];

            element_knee_extension_right_2D.innerHTML = data.pose_landmarks_points.knee_extension.right["2D"];
            element_knee_extension_right_3D.innerHTML = data.pose_landmarks_points.knee_extension.right["3D"];

            element_knee_flexion_left_2D.innerHTML = data.pose_landmarks_points.knee_flexion.left["2D"];
            element_knee_flexion_left_3D.innerHTML = data.pose_landmarks_points.knee_flexion.left["3D"];

            element_knee_flexion_right_2D.innerHTML = data.pose_landmarks_points.knee_flexion.right["2D"];
            element_knee_flexion_right_3D.innerHTML = data.pose_landmarks_points.knee_flexion.right["3D"];

            element_elbow_extension_left_2D.innerHTML = data.pose_landmarks_points.elbow_extension.left["2D"];
            element_elbow_extension_left_3D.innerHTML = data.pose_landmarks_points.elbow_extension.left["3D"];

            element_elbow_extension_right_2D.innerHTML = data.pose_landmarks_points.elbow_extension.right["2D"];
            element_elbow_extension_right_3D.innerHTML = data.pose_landmarks_points.elbow_extension.right["3D"];

            element_elbow_flexion_left_2D.innerHTML = data.pose_landmarks_points.elbow_flexion.left["2D"];
            element_elbow_flexion_left_3D.innerHTML = data.pose_landmarks_points.elbow_flexion.left["3D"];

            element_elbow_flexion_right_2D.innerHTML = data.pose_landmarks_points.elbow_flexion.right["2D"];
            element_elbow_flexion_right_3D.innerHTML = data.pose_landmarks_points.elbow_flexion.right["3D"];

            element_ankle_dorsiflexion_left_2D.innerHTML = data.pose_landmarks_points.ankle_dorsiflexion.left["2D"];
            element_ankle_dorsiflexion_left_3D.innerHTML = data.pose_landmarks_points.ankle_dorsiflexion.left["3D"];

            element_ankle_dorsiflexion_right_2D.innerHTML = data.pose_landmarks_points.ankle_dorsiflexion.right["2D"];
            element_ankle_dorsiflexion_right_3D.innerHTML = data.pose_landmarks_points.ankle_dorsiflexion.right["3D"];

            element_ankle_plantar_flexion_left_2D.innerHTML = data.pose_landmarks_points.ankle_plantar_flexion.left["2D"];
            element_ankle_plantar_flexion_left_3D.innerHTML = data.pose_landmarks_points.ankle_plantar_flexion.left["3D"];

            element_ankle_plantar_flexion_right_2D.innerHTML = data.pose_landmarks_points.ankle_plantar_flexion.right["2D"];
            element_ankle_plantar_flexion_right_3D.innerHTML = data.pose_landmarks_points.ankle_plantar_flexion.right["3D"];
        }
    });
});

function updatePlot(landmarks) {
    // console.log("Updating 3D Plot:", landmarks);
    // let shoulder_left = {
    //     x: [],
    //     y: [],
    //     z: [],
    //     mode: 'markers+lines',
    //     marker: {
    //         size: 4,
    //         color: 'blue'
    //     },
    //     line: {
    //         color: 'blue',
    //         width: 2
    //     },
    //     type: 'scatter3d'
    // };
    // let shoulder_right = {
    //     x: [],
    //     y: [],
    //     z: [],
    //     mode: 'markers+lines',
    //     marker: {
    //         size: 4,
    //         color: 'blue'
    //     },
    //     line: {
    //         color: 'blue',
    //         width: 2
    //     },
    //     type: 'scatter3d'
    // };
    // shoulder_left.x.push(landmarks["shoulder"]["left"].x);
    // shoulder_left.y.push(landmarks["shoulder"]["left"].y);
    // shoulder_left.z.push(landmarks["shoulder"]["left"].z);

    // shoulder_right.x.push(landmarks["shoulder"]["right"].x);
    // shoulder_right.y.push(landmarks["shoulder"]["right"].y);
    // shoulder_right.z.push(landmarks["shoulder"]["right"].z);

    // Plotly.react('bodyPlot', [shoulder_left, shoulder_right], layout_3d);


    let trace1 = {
        x: [],
        y: [],
        z: [],
        mode: 'markers+lines',
        marker: {
            size: 4,
            color: 'blue'
        },
        line: {
            color: 'blue',
            width: 2
        },
        type: 'scatter3d'
    };

    // Define connection paths
    const connections = [
        ['shoulder', 'elbow'], // Connect shoulder to elbow
        ['knee', 'ankle'],      // Connect knee to ankle
        ['elbow', 'wrist'],    // Connect elbow to wrist
        ['hip', 'knee'],       // Connect hip to knee
        // Add more connections as needed
    ];
    // Loop to create paths between connected joints
    connections.forEach(path => {
        ['left', 'right'].forEach(side => {
            // Push start joint
            trace1.x.push(landmarks[path[0]][side].x);
            trace1.y.push(-landmarks[path[0]][side].z);
            trace1.z.push(-landmarks[path[0]][side].y);

            // Push end joint
            trace1.x.push(landmarks[path[1]][side].x);
            trace1.y.push(-landmarks[path[1]][side].z);
            trace1.z.push(-landmarks[path[1]][side].y);

            // Reintroduce the first point to separate lines
            trace1.x.push(null);
            trace1.y.push(null);
            trace1.z.push(null);
        });
    });
    Plotly.react('bodyPlot', [trace1], layout_3d);


    // Loop through each body part and each side
    // for (let part in landmarks) {
    //     for (let side in landmarks[part]) {
    //         trace1.x.push(landmarks[part][side].x);
    //         trace1.y.push(landmarks[part][side].y);
    //         trace1.z.push(landmarks[part][side].z);
    //     }
    // }
    // Plotly.react('bodyPlot', [trace1], layout_3d);

}
