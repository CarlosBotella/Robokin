document.addEventListener('DOMContentLoaded', event => {
    console.log("entro en la pagina")

    document.getElementById("btn_con").addEventListener("click", connect)
    document.getElementById("btn_dis").addEventListener("click", disconnect)
    document.getElementById("btn_move").addEventListener("click", move)
    document.getElementById("btn_stop").addEventListener("click", stop)
    document.getElementById("btn_sub").addEventListener("click", subscribe)
    document.getElementById("btn_atras").addEventListener("click", atras)
    document.getElementById("btn_izquierda").addEventListener("click", izquierda)
    document.getElementById("btn_derecha").addEventListener("click", derecha)
    document.getElementById("btn_mesa").addEventListener("click", irmesa)

    canvasMap = document.getElementById("map");

    var alante = 0.0
    var lados = 0.0

    data = {
        // ros connection
        ros: null,
        rosbridge_address: 'ws://127.0.0.1:9090/',
        connected: false,
        service_busy: false,
        service_response: ''
    }

    function connect() {
        console.log("Clic en connect")

        data.ros = new ROSLIB.Ros({
            url: data.rosbridge_address
        })

        console.log("Intentando conectar con ROSBridge en: " + data.rosbridge_address)

        // Define callbacks
        data.ros.on("connection", () => {
            data.connected = true
            console.log("Conexion con ROSBridge correcta")
        })
        data.ros.on("error", (error) => {
            console.log("Se ha producido algun error mientras se intentaba realizar la conexion")
            console.log(error)
        })
        data.ros.on("close", () => {
            data.connected = false
            console.log("Conexion con ROSBridge cerrada")
        })

        //Subscribe to the map topic
        var mapTopic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/map',
            messageType: 'nav_msgs/msg/OccupancyGrid'
        });

        mapTopic.subscribe((message) => {
            draw_occupancy_grid(canvasMap, message)
        });
    }

    function disconnect() {
        data.ros.close()
        data.connected = false
        console.log('Clic en botón de desconexión')
    }
    document.getElementById("btn_delante").addEventListener("click", () => {
        call_delante_service("delante")
    })
    document.getElementById("btn_move").addEventListener("click", move)
    function call_delante_service(valor) {
        data.service_busy = true
        data.service_response = ''

        //definimos los datos del servicio
        let service = new ROSLIB.Service({
            ros: data.ros,
            name: '/movement',
            serviceType: 'custom_interface/srv/MyMoveMsg'
        })

        let request = new ROSLIB.ServiceRequest({
            move: valor
        })

        service.callService(request, (result) => {
            data.service_busy = false
            data.service_response = JSON.stringify(result)
        }, (error) => {
            data.service_busy = false
            console.error(error)
        })
    }
    function move() {
        alante = alante + 0.1
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/msg/Twist'
        })
        let message = new ROSLIB.Message({
            linear: { x: alante, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: lados, },
        })

        topic.publish(message)
    }
    function stop() {
        lados = 0.0
        alante = 0.0
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/msg/Twist'
        })
        let message = new ROSLIB.Message({
            linear: { x: alante, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: lados, },
        })

        topic.publish(message)
    }

    function atras() {


        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/msg/Twist'
        })
        let message = new ROSLIB.Message({
            linear: { x: alante, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: lados, },
        })

    }


    function izquierda() {
        lados = lados + 0.1

        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/msg/Twist'
        })
        let message = new ROSLIB.Message({
            linear: { x: alante, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: lados, },
        })
        topic.publish(message)


    }

    function derecha() {

        lados = lados - 0.1

        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/msg/Twist'
        })
        let message = new ROSLIB.Message({
            linear: { x: alante, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: lados, },
        })
        topic.publish(message)


    }

    function irmesa() {
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/goal_pose',
            messageType: 'geometry_msgs/PoseStamped'
        })

        let currentTime = new Date().getTime(); // Tiempo actual en milisegundos
        let seconds = Math.floor(currentTime / 1000); // Segundos
        let nanoseconds = (currentTime % 1000) * 1000000; // Nanosegundos


        let message = new ROSLIB.Message({
            header: {
                frame_id: 'map',
                stamp: {
                    secs: seconds,
                    nsecs: nanoseconds
                }
            },
            pose: {
                position: { x: 2.0, y: 0.4, z: 0, },
                orientation: { x: 0, y: 0, z: 0, w: 2 }
            },
        })

        topic.publish(message)
    }


    function subscribe() {
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/odom',
            messageType: 'nav_msgs/Odometry'
        })
        topic.subscribe((message) => {
            console.log(message)
        })
        topic.subscribe((message) => {
            data.position = message.pose.pose.position
            document.getElementById("pos_x").innerHTML = data.position.x.toFixed(2)
            document.getElementById("pos_y").innerHTML = data.position.y.toFixed(2)

        })
    }


});