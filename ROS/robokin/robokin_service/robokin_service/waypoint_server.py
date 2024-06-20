from geometry_msgs.msg import Twist
from robokin_custom_interface.srv import WayPoints
import rclpy
from rclpy.node import Node
from rclpy.action import ActionClient
from nav2_msgs.action import FollowWaypoints
from geometry_msgs.msg import PoseStamped

class FollowWaypointsClient(Node):
    def __init__(self):
        super().__init__('follow_waypoints_client')
        self._action_client = ActionClient(self, FollowWaypoints, 'follow_waypoints')
        self.waypoints = []

    def send_goal(self, goal_poses):
        goal_msg = FollowWaypoints.Goal()
        goal_msg.poses = goal_poses

        self._action_client.wait_for_server()

        self._send_goal_future = self._action_client.send_goal_async(goal_msg, feedback_callback=self.feedback_callback)
        self._send_goal_future.add_done_callback(self.goal_response_callback)
    
    def goal_response_callback(self, future):
        goal_handle = future.result()
        if not goal_handle.accepted:
            self.get_logger().info('Goal rejected :(')
            return

        self.get_logger().info('Goal accepted :)')
        self._get_result_future = goal_handle.get_result_async()
        self._get_result_future.add_done_callback(self.get_result_callback)
    
    def get_result_callback(self, future):
        result = future.result().result
        self.get_logger().info('Result: {0}'.format(result))
        rclpy.shutdown()

    def feedback_callback(self, feedback_msg):
        feedback = feedback_msg.feedback
        self.get_logger().info('Received feedback: {0}'.format(feedback))

    def set_waypoints(self, pose):
        self.waypoints.append(pose)

    def get_waypoints(self):
        return self.waypoints

class WaypointService(Node):
    def __init__(self):
        super().__init__('waypoint_server')
        self.srv = self.create_service(WayPoints, 'waypoints', self.waypoint_callback)
        self.publisher = self.create_publisher(Twist, 'cmd_vel', 10)
        self.action_client = FollowWaypointsClient()

    def waypoint_callback(self, request, response):
        msg = Twist()
        if request.waypoint == "waypoint":
            # Configura el mensaje Twist aquí si es necesario
            self.publisher.publish(msg)
            self.get_logger().info('Realizando la ruta')

            # Definir los waypoints
            """pose1 = PoseStamped()
            pose1.header.frame_id = 'map'
            pose1.pose.position.x = 2.0
            pose1.pose.position.y = -0.4
            pose1.pose.position.z = 0.0
            pose1.pose.orientation.x = 0.0
            pose1.pose.orientation.y = 0.0
            pose1.pose.orientation.z = 0.0
            pose1.pose.orientation.w = 1.0

            pose2 = PoseStamped()
            pose2.header.frame_id = 'map'
            pose2.pose.position.x = 2.0
            pose2.pose.position.y = -2.0
            pose2.pose.position.z = 0.0
            pose2.pose.orientation.x = 0.0
            pose2.pose.orientation.y = 0.0
            pose2.pose.orientation.z = 0.0
            pose2.pose.orientation.w = 1.0

            pose3 = PoseStamped()
            pose3.header.frame_id = 'map'
            pose3.pose.position.x = 3.0
            pose3.pose.position.y = -3.0
            pose3.pose.position.z = 0.0
            pose3.pose.orientation.x = 0.0
            pose3.pose.orientation.y = 0.0
            pose3.pose.orientation.z = 0.0
            pose3.pose.orientation.w = 1.0

            self.action_client.set_waypoints(pose1)
            self.action_client.set_waypoints(pose2)
            self.action_client.set_waypoints(pose3)

            poses = self.action_client.get_waypoints()"""

            self.action_client.send_goal()

            response.success = True
        else:
            response.success = False
        return response

def main(args=None):
    rclpy.init(args=args)
    service = WaypointService()
    try:
        rclpy.spin(service)
    except KeyboardInterrupt:
        service.get_logger().info('Cerrando el nodo waypoint_service')
    finally:
        service.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
