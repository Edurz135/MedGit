// import "./administratorMain.styles.css";
import { Row, Typography, message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { LocalStorageServices } from "../../../../services";
const { Title, Text } = Typography;
const { Dragger } = Upload;

const props = {
  accept: ".csv",
  name: "file",
  multiple: false,
  action: "http://localhost:3100/api/uploadAppointmentData",
  headers: {
    Authorization: await LocalStorageServices.GetData("accessToken"),
  },
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

export default function AdministratorDataIngestionPage() {
  return (
    <div>
      <Title>Carga masiva de datos</Title>
      <Dragger {...props}>
        <Row justify="center">
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
        </Row>
        <Row justify="center">
          <Text className="ant-upload-text">
            Clickee aquí o arrastre un archivo en esta área para subirlo
          </Text>
        </Row>
        <Row justify="center">
          <Text type="secondary">
            Soporta para carga única o masiva. Está estrictamente prohibido
            subir datos de la empresa u otros archivos prohibidos.
          </Text>
        </Row>
      </Dragger>
    </div>
  );
}
