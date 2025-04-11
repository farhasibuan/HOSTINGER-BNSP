import Layout from "./layout/Layout";
import { Card, Container, Row, Col, Carousel, Button } from "react-bootstrap";
import {
  FaUserGraduate,
  FaBookOpen,
  FaChalkboardTeacher,
  FaSchool,
  FaClipboardList,
  FaCommentDots,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [totalPendaftar, setTotalPendaftar] = useState(0);

  useEffect(() => {
    const getTotalPendaftar = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/v1/pendaftaran");
        setTotalPendaftar(response.data.data.length);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    getTotalPendaftar();
  }, []);

  return (
    <Layout>
      <Container className="mt-4">
        <h3 className="text-center fw-bold">Dashboard PSB Onnline</h3>

        {/* Statistik PSB */}
        <Row className="mt-4">
          <Col md={3}>
            <Card className="text-white bg-primary shadow-lg">
              <Card.Body>
                <h5><FaUserGraduate /> Pendaftar</h5>
                <h2>{totalPendaftar}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-white bg-success shadow-lg">
              <Card.Body>
                <h5><FaBookOpen /> Jurusan</h5>
                <h2>5</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-white bg-warning shadow-lg">
              <Card.Body>
                <h5><FaChalkboardTeacher /> Guru</h5>
                <h2>25</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-white bg-danger shadow-lg">
              <Card.Body>
                <h5><FaSchool /> Ruang Kelas</h5>
                <h2>20</h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Tentang PSB */}
        <Row className="mt-5">
          <Col md={6}>
            <Card className="shadow-lg p-3 mb-4 bg-white rounded">
              <Card.Body>
                <Card.Title className="fw-bold">Tentang PSB</Card.Title>
                <Card.Text>
                  <strong>PSB SMK Harapan Bangsa</strong> adalah sistem pendaftaran online yang mempermudah calon siswa mendaftar dan mengakses informasi terkait proses seleksi dan pengumuman hasil.
                </Card.Text>
                <Button variant="primary">Pelajari Lebih Lanjut</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-lg p-3 mb-4 bg-white rounded">
              <Card.Body>
                <Card.Title className="fw-bold">Fitur PSB</Card.Title>
                <Card.Text>
                  <FaClipboardList /> Pendaftaran Online <br />
                  <FaBookOpen /> Informasi Jurusan <br />
                  <FaChalkboardTeacher /> Profil Guru Pembimbing <br />
                  <FaUserGraduate /> Monitoring Status Pendaftar <br />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Testimoni Alumni */}
        <h4 className="text-center fw-bold mt-5">Testimoni Alumni</h4>
        <Carousel className="mt-3">
          <Carousel.Item>
            <Card className="text-center shadow p-3">
              <Card.Body>
                <FaCommentDots size={40} className="text-primary mb-3" />
                <Card.Text>
                  "Sistem PSB sangat membantu! Saya bisa mendaftar dari rumah tanpa harus datang langsung ke sekolah."
                </Card.Text>
                <Card.Subtitle className="text-muted">- Rina Marlina, Alumni TKJ</Card.Subtitle>
              </Card.Body>
            </Card>
          </Carousel.Item>
          <Carousel.Item>
            <Card className="text-center shadow p-3">
              <Card.Body>
                <FaCommentDots size={40} className="text-primary mb-3" />
                <Card.Text>
                  "Informasi jurusan lengkap dan guru-guru sangat ramah. PSB online ini sangat memudahkan proses pendaftaran."
                </Card.Text>
                <Card.Subtitle className="text-muted">- Dimas Prasetyo, Alumni RPL</Card.Subtitle>
              </Card.Body>
            </Card>
          </Carousel.Item>
        </Carousel>

        {/* Berita & Pengumuman */}
        <h4 className="text-center fw-bold mt-5">Pengumuman Terbaru</h4>
        <Row className="mt-3">
          <Col md={6}>
            <Card className="shadow p-3">
              <Card.Body>
                <Card.Title className="fw-bold">Pembukaan Pendaftaran Gelombang 2</Card.Title>
                <Card.Text>
                  Pendaftaran gelombang kedua akan dibuka mulai 10 April 2025. Jangan lewatkan kesempatan untuk bergabung!
                </Card.Text>
                <Button variant="success">Daftar Sekarang</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow p-3">
              <Card.Body>
                <Card.Title className="fw-bold">Tryout Ujian Masuk</Card.Title>
                <Card.Text>
                  Tryout akan diadakan secara online pada tanggal 15 April 2025. Pastikan kamu sudah mendaftar.
                </Card.Text>
                <Button variant="info">Ikuti Tryout</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Dashboard;
