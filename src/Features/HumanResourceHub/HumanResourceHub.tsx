import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import openMailIcon from '../../assets/openMail.svg';
import closeMailIcon from '../../assets/closeMail.svg';
import addAsTaskIcon from '../../assets/addAsTask.svg';

interface EmailInfo {
    id: number;
    to: string;
    cc: string[];
    subject: string;
    content: string;
}

const EmailComponent: React.FC<EmailInfo> = ({ to, cc, subject, content }) => (
    <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mt: 2, minHeight: '375px' }}>
        <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
            Human Resources - DC
        </Typography>
        <Typography variant="body2" mt={2} color="primary.main">
            To: {to}
        </Typography>
        <Typography variant="body2" mt={1} color="primary.main">
            Cc: {cc.join('; ')}
        </Typography>
        <Typography variant="h6" mt={3} mb={2} color="primary.main">
            {subject}
        </Typography>
        <Typography variant="body2" color="primary.main">{content}</Typography>
    </Paper>
);

const HumanResourceHub: React.FC = () => {
    // Static list of emails
    const emails: EmailInfo[] = [
        {
            id: 1,
            to: 'Jane Smith',
            cc: ['Nimfa Alejandrino', 'Benjie Sapasap'],
            subject: 'Disciplinary Action – John Doe',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        },
        {
            id: 2,
            to: 'John Doe',
            cc: ['Anna Watson'],
            subject: 'Disciplinary Action – Jack Hugh',
            content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem...',
        },
    ];

    // State to track the selected email
    const [selectedEmail, setSelectedEmail] = useState<EmailInfo>(emails[0]);

    // Handle email selection
    const handleEmailClick = (email: EmailInfo) => {
        setSelectedEmail(email);
    };

    return (
        <Box 
            sx={{ 
                minHeight: '100vh', 
                py: { xs: 2, md: 4 }, 
                px: { xs: 2, md: 4 },
                // bgcolor: 'grey.200', 
            }}
        >
            <Typography variant="h4" align="center" fontWeight="bold" color="primary.main" mb={4}>
                Human Resource Hub
            </Typography>

            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 4, md: 10 },
                px: { xs: 0 }
            }}>
                {/* List of Emails section */}
                <Box sx={{
                    flex: '1 1 0%',
                    minWidth: { xs: '100%', md: '33%' },
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}>
                    {emails.map((email) => (
                        <Box
                            key={email.id}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: selectedEmail.id === email.id ? 'grey.300' : 'white',
                                p: 2,
                                borderRadius: '10px',
                                cursor: 'pointer',
                                boxShadow: 2,
                            }}
                            onClick={() => handleEmailClick(email)}
                        >
                            <img src={email.id === selectedEmail.id ? openMailIcon : closeMailIcon} alt="Mail Icon" style={{ width: '20px', marginRight: '8px' }} />
                            <Box>
                                <Typography variant="body2">Human Resources - DC</Typography>
                                <Typography variant="caption" color="black">{email.subject}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
                {/* Email Details section */}
                <Box sx={{
                    flex: '2 1 0%',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
                            {selectedEmail.subject}
                        </Typography>
                    </Paper>
                    <EmailComponent {...selectedEmail} />
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        mt: 2,
                        cursor: 'pointer'
                    }}>
                        <img src={addAsTaskIcon} alt='Add As Task Icon' style={{ width: '25px', marginRight: '8px' }} />
                        <Typography variant="body2" color="#0070C0">
                            Add as Task
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default HumanResourceHub;
