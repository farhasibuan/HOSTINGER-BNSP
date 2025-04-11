import { useContext, useEffect, useState } from "react";
import Layout from "./layout/Layout";
import AuthContext from "../context/AuthContext";
import { Card, Container, Spinner, Image, Row, Col } from "react-bootstrap";

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (user) {
      setProfileData(user);
    } else {
      updateUser();
    }
  }, [user, updateUser]);

  return (
    <Layout>
      <Container className="mt-5">

        {profileData ? (
          <Row className="justify-content-center">
            <Col md={6} lg={5}>
              <Card className="shadow-lg border-0 p-3 bg-light">
                <div className="text-center">
                  <Image
                    src={profileData.avatar || "https://via.placeholder.com/150"}
                    roundedCircle
                    width={120}
                    height={120}
                    className="mb-3 border border-3"
                  />
                  <h4 className="fw-bold">{profileData.name}</h4>
                  <p className="text-muted mb-2">{profileData.email}</p>
                </div>

                <hr />

                <div className="px-3">
                  <p>
                    <strong>Role:</strong> {profileData.role}
                  </p>
                  {/* Tambahkan info lain jika tersedia */}
                </div>
              </Card>
            </Col>
          </Row>
        ) : (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Memuat Profil...</p>
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default Profile;
