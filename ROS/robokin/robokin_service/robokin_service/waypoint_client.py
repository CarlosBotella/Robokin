import sys
import rclpy
from rclpy.node import Node
from robokin_custom_interface.srv import WayPoints

class WaypointClient(Node):
    def __init__(self):
        super().__init__('waypoint_client')
        self.client = self.create_client(WayPoints, 'waypoints')
        while not self.client.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('Service not available, waiting again...')
        self.req = WayPoints.Request()

    def send_request(self, waypoint):
        self.req.waypoint = waypoint
        self.future = self.client.call_async(self.req)
        rclpy.spin_until_future_complete(self, self.future)
        return self.future.result()

def main(args=None):
    rclpy.init(args=args)
    client = WaypointClient()
    response = client.send_request("waypoint")
    if response.success:
        client.get_logger().info('Waypoint processed successfully')
    else:
        client.get_logger().info('Failed to process waypoint')
    client.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()