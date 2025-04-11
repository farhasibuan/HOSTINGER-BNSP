import axios from "axios";
import Layout from "../layout/Layout";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Table, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const Courses = () => {
  const [pendaftars, setPendaftars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const getPendaftars = async () => {
    try {
      const response = await axios.get("https://ahmad.rikpetik.site/api/v1/pendaftaran");
      setPendaftars(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await axios.delete(`https://ahmad.rikpetik.site/api/v1/pendaftaran/delete/${id}`);
        getPendaftars();
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getPendaftars();
  }, []);

  const filteredPendaftars = pendaftars.filter((item) =>
    item.nm_pendaftar.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <Container className="mt-4">
        <Row className="mb-3">
          <Col>
            <h3 className="fw-bold">Daftar Pendaftar</h3>
          </Col>
          <Col className="text-end">
            <Link to="/dashboard/courses/add">
              <Button variant="success">
                <FaPlus /> Tambah Pendaftar
              </Button>
            </Link>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <input
              type="text"
              className="form-control"
              placeholder="Cari berdasarkan nama..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
        </Row>

        {filteredPendaftars.length === 0 ? (
          <Alert variant="warning">Data tidak ditemukan.</Alert>
        ) : (
          <Table striped bordered hover responsive className="shadow-lg">
            <thead className="bg-primary text-white">
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Alamat</th>
                <th>Jenis Kelamin</th>
                <th>No HP</th>
                <th>Asal Sekolah</th>
                <th>Jurusan</th>
                <th>Tgl Lahir</th>
                <th>NISN</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredPendaftars.map((item, index) => (
                <tr key={item.id_pendaftar}>
                  <td>{index + 1}</td>
                  <td>{item.nm_pendaftar}</td>
                  <td>{item.alamat}</td>
                  <td>{item.jenis_kelamin}</td>
                  <td>{item.no_hp}</td>
                  <td>{item.asal_sekolah}</td>
                  <td>{item.jurusan}</td>
                  <td>{item.tgl_lahir}</td>
                  <td>{item.NISN}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() =>
                        navigate(`/dashboard/courses/edit/${item.id_pendaftar}`)
                      }
                    >
                      <FaEdit /> Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(item.id_pendaftar)}
                    >
                      <FaTrash /> Hapus
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <Row className="mt-3">
          <Col>
            <Button variant="secondary" onClick={() => navigate("/dashboard")}>
              Kembali ke Dashboard
            </Button>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Courses;
