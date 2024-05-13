import sys
import rclpy
from rclpy.action import ActionClient
from rclpy.node import Node
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

        self._send_goal_future = self._action_client.send_goal_async(goal_msg,feedback_callback=self.feedback_callback)

        self._send_goal_future.add_done_callback(self.goal_response_callback)
    
    def goal_response_callback(self, future):
        goal_handle = future.result()
        if not goal_handle.accepted:
            self.get_logger().info('Goal rejected :(')
            return

        self.get_logger().info('Goal accepted :)')

        self._get_result_future = goal_handle.get_result_async()
        self._get_result_future.add_done_callback(self.get_result_callback)
    
    #definimos la funcion de respuesta al resultado
    def get_result_callback(self, future):
        result = future.result().result
        #self.get_logger().info('Result: {0}'.format(result))
        rclpy.shutdown()

    #definimos la funcion de respuesta al feedback
    def feedback_callback(self, feedback_msg):
        feedback = feedback_msg
        #self.get_logger().info('Received feedback: {0}'.format(feedback))

    def set_waypoints(self, pose):
        self.waypoints.append(pose)

    def get_waypoints(self):
        return self.waypoints

def main(args=None):
    rclpy.init(args=args)

    action_client = FollowWaypointsClient()
    
    pose = PoseStamped()
    pose.header.frame_id = 'map'
    pose.pose.position.x = 2.0
    pose.pose.position.y = -0.4
    pose.pose.position.z = 0.0
    pose.pose.orientation.x = 0.0
    pose.pose.orientation.y = 0.0
    pose.pose.orientation.z = 0.0
    pose.pose.orientation.w = 1.0

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

    action_client.set_waypoints(pose)
    action_client.set_waypoints(pose2)
    action_client.set_waypoints(pose3)
    poses = action_client.get_waypoints()
    print(poses)           
    future = action_client.send_goal(poses) 

    rclpy.spin(action_client)
    """rclpy.init(args=args)
        pose = PoseStamped()
        # Aquí puedes definir la pose a la que quieres que el robot navegue
        pose.pose.position.x = 1.0
        pose.pose.position.y = 2.0
        pose.pose.orientation.z = 0.0
        pose.pose.orientation.w = 1.0
        navigateToPoseClient = NavigateToPoseClient()
        try:
            rclpy.spin_once(navigateToPoseClient)
        except KeyboardInterrupt:
            navigateToPoseClient.destroy_node()
        finally:
            rclpy.shutdown()"""

if __name__ == '__main__':
    main()