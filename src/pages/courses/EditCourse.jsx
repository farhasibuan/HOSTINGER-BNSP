import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container, Alert, Spinner } from "react-bootstrap";

const EditCourse = () => {
  const [formData, setFormData] = useState({
    nm_pendaftar: "",
    alamat: "",
    jenis_kelamin: "",
    no_hp: "",
    asal_sekolah: "",
    jurusan: "",
    tgl_lahir: "",
    NISN: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  // Ambil data saat component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:3000/api/v1/pendaftaran/${id}`);
        setFormData(res.data.data);
      } catch (err) {
        setError("Gagal mengambil data pendaftar.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Handler untuk perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmpty = Object.values(formData).some((val) => !val.toString().trim());
    if (isEmpty) {
      setError("Semua field harus diisi!");
      return;
    }

    try {
      await axios.put(`http://127.0.0.1:3000/api/v1/pendaftaran/update/${id}`, formData);
      setError("");
      alert("Data berhasil diperbarui!");
      navigate("/dashboard/courses");
    } catch (err) {
      setError("Gagal mengupdate data.");
    }
  };

  return (
    <Layout>
      <Container className="mt-4">
        <h3 className="fw-bold">Edit Data Pendaftar</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" role="status" />
            <p className="mt-2">Memuat data...</p>
          </div>
        ) : (
          <Form onSubmit={handleSubmit} className="shadow-lg p-4 rounded bg-light">

            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                name="nm_pendaftar"
                value={formData.nm_pendaftar}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Alamat</Form.Label>
              <Form.Control
                type="text"
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                placeholder="Masukkan alamat"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Jenis Kelamin</Form.Label>
              <Form.Select name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleChange}>
                <option value="">-- Pilih --</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>No HP</Form.Label>
              <Form.Control
                type="text"
                name="no_hp"
                value={formData.no_hp}
                onChange={handleChange}
                placeholder="08xxxxxxxxxx"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Asal Sekolah</Form.Label>
              <Form.Control
                type="text"
                name="asal_sekolah"
                value={formData.asal_sekolah}
                onChange={handleChange}
                placeholder="Masukkan asal sekolah"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Jurusan</Form.Label>
              <Form.Control
                type="text"
                name="jurusan"
                value={formData.jurusan}
                onChange={handleChange}
                placeholder="Masukkan jurusan yang diambil"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tanggal Lahir</Form.Label>
              <Form.Control
                type="date"
                name="tgl_lahir"
                value={formData.tgl_lahir}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>NISN</Form.Label>
              <Form.Control
                type="text"
                name="NISN"
                value={formData.NISN}
                onChange={handleChange}
                placeholder="Masukkan NISN"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Update Data
            </Button>
            <Button variant="secondary" className="w-100 mt-2" onClick={() => navigate(-1)}>
              Kembali
            </Button>
          </Form>
        )}
      </Container>
    </Layout>
  );
};

export default EditCourse;
