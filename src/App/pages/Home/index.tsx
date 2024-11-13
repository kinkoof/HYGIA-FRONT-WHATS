import React from 'react';
import { Button, Container, Typography, Box, Grid } from '@mui/material';

function Home() {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif' }}>
            {/* Header */}
            <Container maxWidth="lg">
                <Box textAlign="center" py={5}>
                    <Typography variant="h3" color="primary" gutterBottom>
                        Bem-vindo ao SAURIS
                    </Typography>
                    <Typography variant="h6" color="textSecondary" paragraph>
                        A tecnologia a favor da sua saúde e bem-estar.
                    </Typography>
                    <Button variant="contained" color="primary" size="large" href="#download">
                        Converse Agora!
                    </Button>
                </Box>
            </Container>

            {/* Section: Por que SAURIS */}
            <Container maxWidth="md">
                <Box textAlign="center" py={5}>
                    <Typography variant="h4" color="primary" gutterBottom>
                        Por que o SAURIS é essencial para você?
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="body1" color="textSecondary" paragraph>
                                <strong>Apoio especializado:</strong> Integração com o WhatsApp para suporte através de robôs inteligentes que oferecem respostas claras e objetivas.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="body1" color="textSecondary" paragraph>
                                <strong>Segurança e praticidade:</strong> Garantia de que você tenha uma experiência tranquila e sem complicações na compra dos seus medicamentos.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="body1" color="textSecondary" paragraph>
                                <strong>Atendimento personalizado:</strong> A plataforma se adapta às suas necessidades, oferecendo ajuda sempre que necessário.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="body1" color="textSecondary" paragraph>
                                <strong>Foco no bem-estar:</strong> Proporciona mais segurança, praticidade e conforto, especialmente para quem prefere não depender de outros para comprar seus próprios medicamentos.
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Container>

            {/* Section: Como funciona */}
            <Container maxWidth="md">
                <Box textAlign="center" py={5}>
                    <Typography variant="h4" color="primary" gutterBottom>
                        Como funciona?
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="body1" color="textSecondary" paragraph>
                                <strong>Busca facilitada:</strong> Encontre facilmente os medicamentos de que você precisa.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="body1" color="textSecondary" paragraph>
                                <strong>Entrega rápida e segura:</strong> Receba seus medicamentos em casa com toda a segurança e eficiência.
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Container>

            {/* Section: Call to Action */}
            <Container maxWidth="lg">
                <Box textAlign="center" py={5}>
                    <Typography variant="h5" color="primary" gutterBottom>
                        Experimente o SAURIS hoje e descubra como podemos melhorar a sua experiência de compra de medicamentos!
                    </Typography>

                </Box>
            </Container>

        </div>
    );
}

export default Home;
