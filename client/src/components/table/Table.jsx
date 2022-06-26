import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
      id: 1143155,
      product: "Torta con profiteroles",
      img: "https://cdn.shopify.com/s/files/1/0554/4892/8441/products/torta33_540x.jpg?v=1621038819",
      customer: "John Smith",
      date: "1 Marzo",
      amount: "$22.000",
      method: "Cash on Delivery",
      status: "Approved",
    },
    {
      id: 2235235,
      product: "Torta flork",
      img: "https://cdn.shopify.com/s/files/1/0554/4892/8441/products/flork4_540x.jpg?v=1646871493",
      customer: "Michael Doe",
      date: "1 Marzo",
      amount: "$20.000",
      method: "Online Payment",
      status: "Pending",
    },
    {
      id: 2342353,
      product: "Torta glow",
      img: "https://cdn.shopify.com/s/files/1/0554/4892/8441/products/Glow1_540x.jpg?v=1620941296",
      customer: "John Smith",
      date: "1 Marzo",
      amount: "$20.000",
      method: "Cash on Delivery",
      status: "Pending",
    },
    {
      id: 2357741,
      product: "Torta deluxe",
      img: "https://cdn.shopify.com/s/files/1/0554/4892/8441/products/TortaDeluxe1_360x.jpg?v=1621283457",
      customer: "Jane Smith",
      date: "1 Marzo",
      amount: "$25.000",
      method: "Online",
      status: "Approved",
    },
    {
      id: 2342355,
      product: "Torta choco oreo",
      img: "https://cdn.shopify.com/s/files/1/0554/4892/8441/products/ChocoOreo12_360x.jpg?v=1621030262",
      customer: "Harold Carol",
      date: "1 Marzo",
      amount: "$20.000",
      method: "Online",
      status: "Pending",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
