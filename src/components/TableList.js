import React from "react";
import {
  Card,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function LedgerList() {
  const ledgerData = [
    // January to May (previously defined)
    { id: 1, clientName: "Dakota Rice", artworkName: "The Dawn", amountPaid: 310, month: "Jan" },
    { id: 2, clientName: "Aaron Katz", artworkName: "Winter Bliss", amountPaid: 400, month: "Jan" },
    { id: 3, clientName: "Minerva Hooper", artworkName: "Summer Fields", amountPaid: 200, month: "Feb" },
    { id: 4, clientName: "Sage Rodriguez", artworkName: "Hidden Depths", amountPaid: 400, month: "Feb" },
    { id: 5, clientName: "Philip Chaney", artworkName: "Quiet Solitude", amountPaid: 320, month: "Mar" },
    { id: 6, clientName: "Laura Moon", artworkName: "Spring Awakening", amountPaid: 200, month: "Mar" },
    { id: 7, clientName: "Doris Greene", artworkName: "Misty Mountains", amountPaid: 500, month: "Apr" },

    // Hypothetical values for June to December
    { id: 8, clientName: "Steve Morrow", artworkName: "Ocean Breeze", amountPaid: 460, month: "Jun" },
    { id: 9, clientName: "Gina Weld", artworkName: "City Silhouette", amountPaid: 500, month: "Jul" },
    { id: 10, clientName: "Mark Benson", artworkName: "Autumn Leaves", amountPaid: 430, month: "Aug" },
    { id: 11, clientName: "Chris Dawn", artworkName: "The Quiet Field", amountPaid: 580, month: "Sept" },
    { id: 12, clientName: "Olivia Lane", artworkName: "Night Stars", amountPaid: 610, month: "Oct" },
    { id: 13, clientName: "Lucas Grey", artworkName: "Winter Morning", amountPaid: 370, month: "Nov" },
    { id: 14, clientName: "Sara Myles", artworkName: "December Snow", amountPaid: 420, month: "Dec" },
  ];

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Client Artwork Ledger</Card.Title>
                <p className="card-category">Detailed record of artwork purchases by clients</p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Client Name</th>
                      <th>Artwork Name</th>
                      <th>Amount Paid</th>
                      <th>Month</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ledgerData.map(entry => (
                      <tr key={entry.id}>
                        <td>{entry.id}</td>
                        <td>{entry.clientName}</td>
                        <td>{entry.artworkName}</td>
                        <td>${entry.amountPaid.toLocaleString()}</td>
                        <td>{entry.month}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LedgerList;
