import React, { useState } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";

const AddCourse = () => {
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
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmpty = Object.values(formData).some((val) => !val);
    if (isEmpty) {
      setError("Semua field harus diisi!");
      return;
    }

    try {
      await axios.post("https://ahmad.rikpetik.site/api/v1/pendaftaran/create", formData);
      alert("Data pendaftar berhasil disimpan!");
      navigate("/dashboard/Courses");
    } catch (error) {
      setError(error.response?.data?.message || "Terjadi kesalahan saat menyimpan data.");
    }
  };

  return (
    <Layout>
      <Container className="mt-4">
        <h3 className="fw-bold">Tambah Data Pendaftar</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit} className="shadow-lg p-4 rounded bg-light">
          <Form.Group className="mb-3">
            <Form.Label>Nama Pendaftar</Form.Label>
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
              <option value="">Pilih jenis kelamin</option>
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
              placeholder="Masukkan nomor HP"
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
              placeholder="Masukkan jurusan pilihan"
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
            Simpan Pendaftar
          </Button>
          <Button
            variant="secondary"
            className="w-100 mt-2"
            onClick={() => navigate(-1)}
          >
            Kembali
          </Button>
        </Form>
      </Container>
    </Layout>
  );
};

export default AddCourse;
