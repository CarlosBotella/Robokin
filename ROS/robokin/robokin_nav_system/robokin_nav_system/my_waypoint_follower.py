from rclpy.node import Node
from geometry_msgs.msg import PoseStamped, Twist
from my_msgs.srv import WayPoints  # Asegúrate de que este es el nombre correcto del servicio
from my_action_clients import FollowWaypointsClient  # Asegúrate de que este es el nombre correcto del cliente de acción

class WaypointService(Node):
    def __init__(self):
        super().__init__('waypoint_server')
        self.srv = self.create_service(WayPoints, 'waypoints', self.waypoint_callback)
        self.publisher = self.create_publisher(Twist, 'cmd_vel', 10)
        self.action_client = FollowWaypointsClient()

    def waypoint_callback(self, request, response):
        msg = Twist()
        if request.waypoint == "waypoint":
            self.publisher.publish(msg)
            self.get_logger().info('Realizando la ruta')

            # Procesar los waypoints enviados en la solicitud
            poses = []
            for wp in request.waypoints:
                pose = PoseStamped()
                pose.header.frame_id = 'map'
                pose.pose.position.x = wp.x
                pose.pose.position.y = wp.y
                pose.pose.position.z = wp.z
                pose.pose.orientation.x = wp.orientation_x
                pose.pose.orientation.y = wp.orientation_y
                pose.pose.orientation.z = wp.orientation_z
                pose.pose.orientation.w = wp.orientation_w
                poses.append(pose)

            self.action_client.send_goal(poses)

            response.success = True
        else:
            response.success = False

        return response
