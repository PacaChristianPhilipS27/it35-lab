import { 
    IonAlert,
    IonAvatar,
    IonButton,
    IonContent, 
    IonIcon, 
    IonInput, 
    IonInputPasswordToggle,  
    IonPage,  
    IonToast,  
    useIonRouter
  } from '@ionic/react';
  import { logoIonic } from 'ionicons/icons';
  import { useEffect, useState } from 'react';
  import { supabase } from '../utils/supabaseClient';
  
  const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => {
    return (
      <IonAlert
        isOpen={isOpen}
        onDidDismiss={onClose}
        header="Notification"
        message={message}
        buttons={['OK']}
      />
    );
  };
  
  const Login: React.FC = () => {
    const navigation = useIonRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showToast, setShowToast] = useState(false);
  
    
    useEffect(() => {
      const style = document.createElement('style');
      style.innerHTML = `
        ion-content {
          --background: transparent;
          background-image: url('https://cdn.wallpapersafari.com/28/43/pM3v1F.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          height: 100%;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
  
  
        .login-avatar {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          overflow: hidden;
          border: 5px solid black;
          box-shadow: 0 0 75px black;
          margin-bottom: 20px;
        }
  
        .login-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      `;
      document.head.appendChild(style);
      return () => {
        document.head.removeChild(style);
      };
    }, []);
    const doLogin = async () => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
  
      if (error) {
        setAlertMessage(error.message);
        setShowAlert(true);
        return;
      }
  
      setShowToast(true); 
      setTimeout(() => {
        navigation.push('/it35-lab/app', 'forward', 'replace');
      }, 300);
    };
    
    return (
      <IonPage>
        <IonContent className='ion-padding'>
          <div style={{
            display: 'flex',
            color:'black',
            flexDirection:'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop:'25%'
          }}>
           <IonAvatar className="login-avatar">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW6p6dcF3XD70LTrqpJtlhXLF0dAoI0b0LJw&sss"
              alt="User Avatar"
            />
          </IonAvatar>
          <h1 style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '65px',
  fontFamily: "'Shadowed Black', cursive",
  color: '#ffffff',
  marginTop: '30px',
  textShadow: `
    -3px -3px 0 #000,  
     0px -3px 0 #000,
     3px -3px 0 #000,
    -3px  0px 0 #000,
     3px  0px 0 #000,
    -3px  3px 0 #000,
     0px  3px 0 #000,
     3px  3px 0 #000,
     0px 0px 10px #000
  `,
  letterSpacing: '2px',
  animation: 'bounce 1.5s infinite',
}}>
  LET'S DANCE!
</h1>
<IonInput
  label="Email"
  labelPlacement="floating"
  fill="outline"
  type="email"
  placeholder="Enter Email"
  value={email}
  onIonChange={e => setEmail(e.detail.value!)}
  style={{
    backgroundColor: 'rgba(128, 128, 128, 0.2)', 
    borderRadius: '10px',
    padding: '10px', 
    color: '#000',
    backdropFilter: 'blur(5px)', 
    marginTop: '20px',
    border: '2px solid #000', 
  }}
/>

            <IonInput style={{
    backgroundColor: 'rgba(128, 128, 128, 0.2)', 
    borderRadius: '10px', 
    padding: '10px', 
    color: '#000',
    backdropFilter: 'blur(5px)', 
    marginTop: '20px', 
  border: '2px solid #000', }}      
              fill="outline"
              type="password"
              placeholder="Password"
              value={password}
              onIonChange={e => setPassword(e.detail.value!)}
            >
              <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
            </IonInput>
          </div>
          <IonButton
  onClick={doLogin}
  expand="full"
  shape="round"
  style={{
    backgroundColor: '#000', 
    color: '#fff', 
    border: '2px solid #fff', 
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)', 
    padding: '10px 20px',
    fontSize: '16px', 
    marginTop: '20px', 
    textAlign: 'center', 
    transition: 'all 0.3s ease-in-out',
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = '#fff';
    e.currentTarget.style.color = '#000'; 
    e.currentTarget.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.7)'; 
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = '#000';
    e.currentTarget.style.color = '#fff'; 
    e.currentTarget.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.5)'; 
  }}
>
  Login
</IonButton>

  
          <IonButton routerLink="/it35-lab/register" expand="full" fill="clear" shape='round' color='black'>
            Don't have an account? Register here
          </IonButton>
  
          {/* Reusable AlertBox Component */}
          <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />
  
          {/* IonToast for success message */}
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message="Login successful! Redirecting..."
            duration={1500}
            position="top"
            color="primary"
          />
        </IonContent>
      </IonPage>
    );
  };
  
  export default Login;