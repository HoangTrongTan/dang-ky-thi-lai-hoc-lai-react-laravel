import { Table } from "rsuite";
const { Column, HeaderCell, Cell } = Table;
function InfoVerify({data=[]}) {
  return (
    <Table height={200} data={data}>
      <Column width={100} resizable fullText>
        <HeaderCell>Tên học phần</HeaderCell>
        <Cell dataKey="tenhocphan" />
      </Column>

      <Column width={60} resizable fullText>
        <HeaderCell>Số tín</HeaderCell>
        <Cell dataKey="sotin" />
      </Column>

      <Column width={60} resizable fullText>
        <HeaderCell>Học kỳ</HeaderCell>
        <Cell dataKey="ky" />
      </Column>
      <Column width={80} resizable fullText>
        <HeaderCell>Năm</HeaderCell>
        <Cell dataKey="nam" />
      </Column>
      <Column width={80} resizable fullText>
        <HeaderCell>Điểm thi lần 1</HeaderCell>
        <Cell dataKey="diemlan1" />
      </Column>
      <Column width={70} resizable fullText>
        <HeaderCell>Loại thi</HeaderCell>
        <Cell dataKey="loai" />
      </Column>
      <Column width={100} resizable fullText>
        <HeaderCell>Ghi chú</HeaderCell>
        <Cell dataKey="ghichu" />
      </Column>
    </Table>
  );
}

export default InfoVerify;
