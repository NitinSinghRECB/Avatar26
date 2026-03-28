import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../components/Crew.css'; 

const TeamPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faculty = [
   'Dr. Siddhartha Kumar Arjaria' , 'Dr. Pushpendra Singh', 'Mr. Abhijeet Singh'
  ];

  const studentCoordinators = [
    { role: 'Organizer', names: 'Aditya Gautam'},
    { role: 'Head Coordinators', names: 'Pradeep Chaudhary, Krishna Kant Singh'},
    { role: 'Code Craft', names: 'Abhimanyu Singh, Nitin Kumar Singh' },
    { role: 'Prompt Engineering', names: 'Nitin Kumar Singh, Sanny Kumar' },
    { role: 'Cubic Puzzle', names: 'Divyansh Pandey, Saurabh Kumar Saroj' },
    { role: 'Treasure Hunt', names: 'Kshitij Rastogi, Abhishek Gangwar, Anand Bind, Yashnil Singh, Samarth Singh' },
    { role: 'Social Media Team', names: 'Ravi' },
    { role: 'Poster Design', names: 'Raghvendra Singh, Anivesh Tyagi' },
    { role: 'Robo Games', names: 'Lucky Singh, Samarth Gupta' },
    { role: 'Circuit Craze (Godown Wiring)', names: 'Harish Rajput , Pratham Jain' },
    { role: 'Circuit Craze(Tinkercad Challeng)', names: 'Aman Kumar, Arnav Singh' },
    { role: 'Egg Drop Challenge', names: 'Gaurav Kumar, Sameer Diwakar, Abhishek Kannaujiya' },
    { role: 'Ideathon', names: 'Akhilesh Singh Yadav, Kshitij Rastogi' },
    { role: 'Rocket Launcher', names: 'Pratham Jain, Sameer Deewakar , Divyansh Pandey, Yashnil Singh, Abhishek Gangwar' },
  ];

  const volunteers = [
    'Ishan Kumar','Yogesh Singh', 'Satyam Maurya', 'Dhirendra Bind', 'Ali Ashab Shah', 'Kaushal Patel', 
    'Pappu Kumar', 'Ayush Kumar', 'Aman Patel', 'Akash Kumar', 'Nitin Verma', 
    'Prashant Kumar', 'Rama Raman Pandey', 'Manish Nishad', 'Namrata Tiwari',
    'Chhatrasal Singh', 'Mohit Kumar', 'Saurabh Kumar Singh', 'Anand Kumar', 'Dubey Ankit Dilip', 
    'Astha Gupta', 'Nandini Chaturvedi', 'Anil Kumar', 'Shubham Yadav', 'Asha Gautam', 
    'Raksha', 'Himanshi Verma', 'Meera', 'Prakash Kumar', 'Ashutosh Kumar', 
    'Avneesh Kumar', 'Raunak Pandey', 'Abhay Maurya', 'Annu Dutt', 'Aashka Pratap', 
    'Jeetu Verma'
  ];

  return (
    <div style={{ background: '#060608', minHeight: '100vh', paddingBottom: '50px' }}>
      <Navbar onRegisterClick={() => window.location.href = "/"} />
      
      <div style={{ paddingTop: '120px', paddingBottom: '50px', maxWidth: '1000px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 className="font-squid" style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: 'var(--white)', letterSpacing: '4px', marginBottom: '15px' }}>
            <span style={{ color: 'var(--teal)' }}>COORDINATORS</span> & VOLUNTEERS
          </h1>
          <p className="font-orbitron" style={{ color: 'var(--cream)', opacity: 0.6, letterSpacing: '2px' }}>THE ARCHITECTS OF AVATAR'26</p>
        </div>

        <div style={{ marginBottom: '50px' }}>
          <h2 className="font-squid" style={{ color: 'var(--pink)', borderBottom: '1px dashed var(--pink)', paddingBottom: '10px', marginBottom: '25px', fontSize: '24px' }}>FACULTY COORDINATORS</h2>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {faculty.map((name, i) => (
              <div key={i} style={{ background: 'rgba(255,0,102,0.05)', border: '1px solid rgba(255,0,102,0.2)', padding: '15px 25px', borderRadius: '4px', flex: '1 1 250px' }}>
                <div className="font-squid" style={{ color: 'var(--white)', fontSize: '18px' }}>{name}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '50px' }}>
          <h2 className="font-squid" style={{ color: 'var(--teal)', borderBottom: '1px dashed var(--teal)', paddingBottom: '10px', marginBottom: '25px', fontSize: '24px' }}>STUDENT COORDINATORS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {studentCoordinators.map((team, i) => (
              <div key={i} style={{ background: 'rgba(0,201,177,0.03)', border: '1px solid rgba(0,201,177,0.15)', padding: '20px', borderRadius: '4px' }}>
                <div className="font-orbitron" style={{ color: 'var(--teal)', fontSize: '12px', letterSpacing: '1px', marginBottom: '10px', textTransform: 'uppercase' }}>{team.role}</div>
                <div className="font-squid" style={{ color: 'var(--white)', fontSize: '14px', lineHeight: '1.6' }}>{team.names}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-squid" style={{ color: 'var(--white)', borderBottom: '1px dashed rgba(255,255,255,0.2)', paddingBottom: '10px', marginBottom: '25px', fontSize: '24px' }}>VOLUNTEERS</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {volunteers.map((name, i) => (
              <div key={i} className="font-squid" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '10px 20px', borderRadius: '30px', fontSize: '12px', color: 'var(--cream)' }}>
                {name}
              </div>
            ))}
          </div>
        </div>

      </div>
      
      <Footer />
    </div>
  );
};

export default TeamPage;
