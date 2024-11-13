import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Paper, Avatar, Rating } from '@mui/material';
import SupportIcon from '@mui/icons-material/HeadsetMic';
import SecurityIcon from '@mui/icons-material/Security';
import PersonalizedIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import logo from './logo.png'; // Importação da logo

function Home() {
    return (
        <div>
            {/* Hero Section */}
            {/* <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Poppins, sans-serif' }}>
                        Sauris
                    </Typography>
                    <Button color="inherit" sx={{ fontFamily: 'Poppins, sans-serif' }}>Home</Button>
                    <Button color="inherit" sx={{ fontFamily: 'Poppins, sans-serif' }}>Perfil</Button>
                    <Button color="inherit" sx={{ fontFamily: 'Poppins, sans-serif' }}>Login</Button>
                </Toolbar>
            </AppBar> */}

            <Box
                sx={{
                    bgcolor: '#e3f2fd',
                    py: 10,
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0) 30%, rgba(0,144,255,0.15))',
                        opacity: 0.6,
                        transition: 'opacity 0.5s',
                    },
                }}
            >
                <Container maxWidth="md">
                    <img src={logo} alt="Logo Sauris" style={{ width: '200px', marginBottom: '20px', marginTop: '-25px' }} />
                    <Typography variant="h3" gutterBottom sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                        Revolucione o cuidado com sua saúde
                    </Typography>
                    <Typography variant="h6" paragraph sx={{ fontFamily: 'Poppins, sans-serif', mb: 4 }}>
                        Sua solução inteligente para suporte e compra de medicamentos com segurança.
                    </Typography>
                    <Button variant="contained" color="primary" size="large" sx={{ mt: 3, fontFamily: 'Poppins, sans-serif', px: 5, py: 1.5 }}>
                        Entrar em Contato
                    </Button>
                </Container>
            </Box>

            {/* Benefits Section */}
            <Container maxWidth="lg" sx={{ py: 10 }}>
                <Typography variant="h4" marginBottom={'40px'} gutterBottom align="center" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, mb: 5 }}>
                    Por que o SAURIS é essencial para você?
                </Typography>
                <Grid container spacing={4}>
                    {[
                        {
                            title: 'Apoio especializado',
                            description: 'Integração com o WhatsApp para suporte através de robôs inteligentes que oferecem respostas claras e objetivas.',
                            icon: <SupportIcon fontSize="large" />,
                        },
                        {
                            title: 'Segurança e praticidade',
                            description: 'Garantia de uma experiência tranquila e sem complicações na compra dos seus medicamentos.',
                            icon: <SecurityIcon fontSize="large" />,
                        },
                        {
                            title: 'Atendimento personalizado',
                            description: 'A plataforma se adapta às suas necessidades, oferecendo ajuda sempre que necessário.',
                            icon: <PersonalizedIcon fontSize="large" />,
                        },
                        {
                            title: 'Foco no bem-estar',
                            description: 'Proporciona mais segurança, praticidade e conforto, especialmente para quem prefere não depender de outros para comprar seus próprios medicamentos.',
                            icon: <PersonalizedIcon fontSize="large" />,
                        },
                    ].map((item, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 3,
                                    textAlign: 'center',
                                    borderRadius: 3,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    height: '100%',
                                }}
                            >
                                {item.icon}
                                <Typography variant="h6" gutterBottom sx={{ mt: 2, fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body1" color="textSecondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                                    {item.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* How it Works Section */}
            <Container maxWidth="lg" sx={{ py: 10 }}>
                <Typography variant="h4" marginBottom={'40px'} gutterBottom align="center" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                    Como funciona?
                </Typography>
                <Grid container spacing={8}>
                    {[
                        {
                            title: 'Busca facilitada',
                            description: 'Encontre facilmente os medicamentos de que você precisa.',
                            icon: <SearchIcon color="primary" />,
                        },
                        {
                            title: 'Entrega rápida e segura',
                            description: 'Receba seus medicamentos em casa com toda a segurança e eficiência.',
                            icon: <LocalShippingIcon color="primary" />,
                        },
                        {
                            title: 'Informações detalhadas',
                            description: 'Acesse informações detalhadas sobre os produtos para fazer a melhor escolha.',
                            icon: <VerifiedUserIcon color="primary" />,
                        },
                        {
                            title: 'Recomendações personalizadas',
                            description: 'Receba recomendações com base no seu histórico de compras.',
                            icon: <PersonalizedIcon color="primary" />,
                        },
                        {
                            title: 'Segurança de dados',
                            description: 'Seus dados são protegidos com a mais alta tecnologia de segurança.',
                            icon: <SecurityIcon color="primary" />,
                        },
                        {
                            title: 'Suporte 24/7',
                            description: 'Conte com suporte técnico e de atendimento disponível a qualquer momento.',
                            icon: <SupportIcon color="primary" />,
                        },
                    ].map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                }}
                            >
                                {item.icon}
                                <Typography variant="h6" gutterBottom sx={{ mt: 2, fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body1" color="textSecondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                                    {item.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Testimonials Section */}
            <Box sx={{ bgcolor: '#f1f1f1', py: 10 }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" marginBottom={'40px'} gutterBottom align="center" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                        O que nossos clientes dizem
                    </Typography>
                    <Grid container spacing={4}>
                        {[{
                            name: 'Maria Silva',
                            feedback: 'O SAURIS facilitou muito a minha vida! Consigo comprar medicamentos com praticidade.',
                            avatar: 'https://via.placeholder.com/150',
                            rating: 5,
                        },
                        {
                            name: 'João Pereira',
                            feedback: 'A experiência foi incrível e o suporte é impecável. Recomendo a todos!',
                            avatar: 'https://via.placeholder.com/150',
                            rating: 4.5,
                        },
                        {
                            name: 'Ana Costa',
                            feedback: 'O atendimento é personalizado e me fez sentir cuidada em cada etapa da compra.',
                            avatar: 'https://via.placeholder.com/150',
                            rating: 5,
                        },
                        {
                            name: 'Carlos Lima',
                            feedback: 'A plataforma é intuitiva e a entrega foi super rápida. Melhor escolha que já fiz!',
                            avatar: 'https://via.placeholder.com/150',
                            rating: 5,
                        },
                        ].map((item, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Paper
                                    elevation={2}
                                    sx={{
                                        p: 3,
                                        borderRadius: 3,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Avatar alt={item.name} src={item.avatar} sx={{ width: 80, height: 80, mb: 2 }} />
                                    <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Poppins, sans-serif', mb: 2, textAlign: 'center' }}>
                                        {item.feedback}
                                    </Typography>
                                    <Rating value={item.rating} precision={0.5} readOnly />
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* FAQ Section */}
            <Container maxWidth="md" sx={{ py: 10 }}>
                <Typography variant="h4" gutterBottom align="center" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, mb: 5 }}>
                    Perguntas Frequentes
                </Typography>
                {[{
                    question: 'O que é o SAURIS?',
                    answer: 'O SAURIS é uma plataforma que ajuda na compra de medicamentos e no suporte personalizado através da tecnologia.',
                },
                {
                    question: 'Como faço para começar a usar?',
                    answer: 'Basta clicar no botão "Comece Agora" e seguir as instruções para se cadastrar e começar a usar a plataforma.',
                },
                {
                    question: 'É seguro usar o SAURIS?',
                    answer: 'Sim, a segurança e privacidade de nossos usuários são nossas maiores prioridades.',
                },
                ].map((item, index) => (
                    <Paper key={index} elevation={3} sx={{ mb: 3, p: 3 }}>
                        <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, mb: 1 }}>
                            {item.question}
                        </Typography>
                        <Typography variant="body1" sx={{ fontFamily: 'Poppins, sans-serif', color: 'textSecondary' }}>
                            {item.answer}
                        </Typography>
                    </Paper>
                ))}
            </Container>

            {/* Footer */}
            {/* <Box sx={{ bgcolor: '#333', color: '#fff', py: 4 }}>
                <Container maxWidth="lg">
                    <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                        © 2024 Sauris. Todos os direitos reservados.
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Feito com ❤️ pela equipe Sauris.
                    </Typography>
                </Container>
            </Box> */}
        </div>
    );
}

export default Home;
