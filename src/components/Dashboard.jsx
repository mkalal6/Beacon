import React from "react";
import { Line, Pie } from "react-chartjs-2";
import Chart from 'chart.js/auto';// react-bootstrap components
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

function Dashboard() {
  const lineChartData = {
    labels: [
      "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May",
    ],
    datasets: [
      {
        label: '2023',
        data: [50, 148, 115, 430, 554, 403, 698, 710],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        fill: false,
      },
      {
        label: '2024',
        data: [, , , , , , , 710, 600, 520, 500],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: false,
      }
    ]
  };

  const lineChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    maintainAspectRatio: false
  };


  const notifications = [
    { type: "info", message: "You have 5 new sales from your latest collection!" },
    { type: "warning", message: "Inventory alert: 'Abstract' is now out of stock." },
    { type: "success", message: "Price update successful for 'Serenity' to $80." },
    { type: "danger", message: "Invoice overdue for client #007 for 'Quiet Lake' purchase." },
    { type: "info", message: "New order received for 'Deep Blue', prepare for shipment." },
    { type: "success", message: "Order #16 for 'Happiness' has been delivered successfully." },
    { type: "warning", message: "Payment issue detected for transaction #7789 involving 'Sunny Meadows'." },
  ];
  return (
    <>
      <Container fluid>
      <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Monthly Sales Over Time</Card.Title>
                <p className="card-category"></p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours" style={{ height: '245px' }}>
                  <Line data={lineChartData} options={lineChartOptions} />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  2023
                  <i className="fas fa-circle text-danger"></i>
                  2024
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 5 Days Ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="4">
          <Card>
              <Card.Header>
                <Card.Title as="h4">Notifications</Card.Title>
                <p className="card-category">Recent Alerts & Messages</p>
              </Card.Header>
              <Card.Body>
                <div className="notifications">
                  <ul className="list-unstyled">
                    {notifications.map((notification, index) => (
                      <li key={index}>
                        <Badge variant={notification.type}>{notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}</Badge> {notification.message}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
          <Card>
  <Card.Header>
    <Card.Title as="h4">Artwork Inventory</Card.Title>
    <p className="card-category">Thumbnails of Art Pieces with Details</p>
  </Card.Header>
  <Card.Body>
    <div className="row">
      {/* Artwork 1 */}
      <div className="col-lg-4 col-md-6 col-sm-12">
        <div className="thumbnail">
          <img
            src={"./src/assets/img/serenity.jpg"}
            alt="Serenity"
            className="img-thumbnail"
          />
          <div className="caption">
            <h5>Serenity</h5>
            <p>Stock: 10</p>
            <p>Price: $80</p>
          </div>
        </div>
      </div>
      {/* Artwork 2 */}
      <div className="col-lg-4 col-md-6 col-sm-12">
        <div className="thumbnail">
          <img
            src={"./src/assets/img/deepblue.jpg"}
            alt="Deep Blue"
            className="img-thumbnail"
          />
          <div className="caption">
            <h5>Deep Blue</h5>
            <p>Stock: 5</p>
            <p>Price: $300</p>
          </div>
        </div>
      </div>
      {/* Artwork 3 */}
      <div className="col-lg-4 col-md-6 col-sm-12">
        <div className="thumbnail">
          <img
            src={"./src/assets/img/happiness.jpg"}
            alt="Happiness"
            className="img-thumbnail"
          />
          <div className="caption">
            <h5>Happiness</h5>
            <p>Stock: 2</p>
            <p>Price: $450</p>
          </div>
        </div>
      </div>
    </div>
  </Card.Body>
  <Card.Footer>
    <div className="stats">
      <i className="fas fa-check"></i>
      Inventory information updated
    </div>
  </Card.Footer>
</Card>
          </Col>
          <Col md="6">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">Tasks</Card.Title>
                <p className="card-category"></p>
              </Card.Header>
              <Card.Body>
                <div className="table-full-width">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Fulfilling Orders 
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-488980961">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-506045838">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Restocking Supplies
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-537440761">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-21130535">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Scheduling Social Media Posts 
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-577232198">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-773861645">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Update Online Gallery
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-422471719">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-829164576">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>Research Art Fairs</td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-160575228">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-922981635">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
              <Card.Footer>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
