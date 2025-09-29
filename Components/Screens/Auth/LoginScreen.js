import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Dimensions
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { LibrasButton } from '../../UI';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ onLogin, onSkip }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, digite seu email');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Por favor, digite um email válido');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Erro', 'Por favor, digite sua senha');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    // fake loin, usar api real depois
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulação de credenciais válidas
      if (email === 'teste@librasplay.com' && password === '123456') {
        Alert.alert(
          'Login realizado!',
          'Bem-vindo ao LibrasPlay! 🎉',
          [{ text: 'Continuar', onPress: () => onLogin({ email, name: 'Usuário Teste' }) }]
        );
      } else {
        Alert.alert(
          'Erro no Login',
          'Email ou senha incorretos. Tente:\nEmail: teste@librasplay.com\nSenha: 123456'
        );
      }
    }, 1500);
  };

  const handleGuestLogin = () => {
    Alert.alert(
      'Modo Visitante',
      'Você entrará como visitante. Seu progresso não será salvo.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Continuar', onPress: () => onSkip() }
      ]
    );
  };

  return (
    <LinearGradient
      colors={['#ff6b9d', '#4ecdc4', '#ffe66d']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo e Mascote */}
          <View style={styles.logoContainer}>
            <View style={styles.mascotContainer}>
              <MaterialIcons 
                name="back-hand" 
                size={80} 
                color="#fff" 
              />
              {/* Rostinho sorridente na mão */}
              <View style={styles.faceContainer}>
                <View style={styles.eye} />
                <View style={styles.eye} />
                <View style={styles.smile} />
              </View>
            </View>
            <Text style={styles.logoText}>LibrasPlay</Text>
            <Text style={styles.subtitleText}>Faça login para continuar</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <MaterialIcons 
                name="email" 
                size={20} 
                color="#666" 
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Digite seu email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Campo Senha */}
            <View style={styles.inputContainer}>
              <MaterialIcons 
                name="lock" 
                size={20} 
                color="#666" 
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.textInput, styles.passwordInput]}
                placeholder="Digite sua senha"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <MaterialIcons
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>

            
            <LibrasButton
              title={isLoading ? "ENTRANDO..." : "ENTRAR"}
              backgroundColor="#fff"
              textColor="#ff6b9d"
              icon={isLoading ? null : "login"}
              onPress={handleLogin}
              style={styles.loginButton}
              disabled={isLoading}
            />

            <TouchableOpacity
              style={styles.forgotPasswordButton}
              onPress={() => Alert.alert('Esqueci a Senha', 'Funcionalidade em desenvolvimento!')}
            >
              <Text style={styles.forgotPasswordText}>
                Esqueci minha senha
              </Text>
            </TouchableOpacity>

            {/* Divisor */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OU</Text>
              <View style={styles.dividerLine} />
            </View>

            
            <LibrasButton
              title="CONTINUAR COMO VISITANTE"
              backgroundColor="rgba(255,255,255,0.3)"
              textColor="#fff"
              icon="person"
              onPress={handleGuestLogin}
              style={styles.guestButton}
              size="medium"
            />

        
            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => Alert.alert('Criar Conta', 'Funcionalidade em desenvolvimento!')}
            >
              <Text style={styles.signupText}>
                Não tem uma conta? <Text style={styles.signupTextBold}>Cadastre-se</Text>
              </Text>
            </TouchableOpacity>
          </View>

       
          <View style={styles.testInfoContainer}>
            <MaterialIcons name="info" size={16} color="#fff" />
            <Text style={styles.testInfoText}>
              Para testar: teste@librasplay.com / 123456
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  mascotContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  faceContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eye: {
    width: 6,
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
    marginBottom: 1,
  },
  smile: {
    width: 15,
    height: 8,
    borderBottomWidth: 2,
    borderColor: '#333',
    borderRadius: 8,
    marginTop: 3,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 1,
  },
  subtitleText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8,
    opacity: 0.9,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  inputIcon: {
    marginRight: 15,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 20,
    padding: 5,
  },
  loginButton: {
    marginTop: 10,
    marginBottom: 20,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  forgotPasswordButton: {
    alignItems: 'center',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dividerText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 20,
  },
  guestButton: {
    marginBottom: 30,
  },
  signupButton: {
    alignItems: 'center',
  },
  signupText: {
    color: '#fff',
    fontSize: 14,
  },
  signupTextBold: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  testInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  testInfoText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 8,
    fontStyle: 'italic',
  },
});

export default LoginScreen;