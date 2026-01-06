'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { updateUserProfile, changePassword, deleteUserAccount } from '@/lib/firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Bell, 
  Globe, 
  Shield, 
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

interface UserProfile {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
}

interface Preferences {
  emailPromociones: boolean;
  emailPedidos: boolean;
  emailRecomendaciones: boolean;
  idioma: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ConfiguracionPage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<'perfil' | 'seguridad' | 'preferencias'>('perfil');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Estado del perfil
  const [profile, setProfile] = useState<UserProfile>({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
  });

  // Estado de contraseña
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Estado de preferencias
  const [preferences, setPreferences] = useState<Preferences>({
    emailPromociones: true,
    emailPedidos: true,
    emailRecomendaciones: false,
    idioma: 'es',
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/cuenta/login');
    }

    if (user && db) {
      // Cargar datos del usuario desde Firestore
      const loadUserData = async () => {
        try {
          if (!db) return; // Validación adicional para TypeScript
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setProfile({
              nombre: userData.nombre || '',
              apellidos: userData.apellidos || '',
              email: userData.email || user.email || '',
              telefono: userData.telefono || '',
            });
          }
        } catch (error) {
          console.error('Error al cargar datos del usuario:', error);
        }
      };
      loadUserData();
    }
  }, [user, isLoading, router]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      if (!user) {
        throw new Error('No hay usuario autenticado');
      }

      await updateUserProfile(user.uid, {
        nombre: profile.nombre,
        apellidos: profile.apellidos,
        telefono: profile.telefono,
      });
      
      setMessage({ type: 'success', text: 'Perfil actualizado correctamente' });
      
      // Ocultar mensaje después de 3 segundos
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Error al actualizar el perfil' });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    // Validaciones
    if (!passwordForm.currentPassword) {
      setMessage({ type: 'error', text: 'Ingresa tu contraseña actual' });
      setIsSaving(false);
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'La contraseña debe tener al menos 8 caracteres' });
      setIsSaving(false);
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: 'error', text: 'Las contraseñas no coinciden' });
      setIsSaving(false);
      return;
    }

    try {
      await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      
      setMessage({ type: 'success', text: 'Contraseña actualizada correctamente' });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      
      // Ocultar mensaje después de 3 segundos
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Error al actualizar la contraseña' });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreferencesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      // Aquí iría la llamada a la API para actualizar las preferencias
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulación
      
      setMessage({ type: 'success', text: 'Preferencias actualizadas correctamente' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al actualizar las preferencias' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    const password = prompt('Para eliminar tu cuenta, ingresa tu contraseña:');
    
    if (!password) {
      return;
    }

    if (!confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      return;
    }

    if (!confirm('Esta acción es irreversible. Se eliminarán todos tus datos. ¿Confirmas?')) {
      return;
    }

    try {
      await deleteUserAccount(password);
      
      logout();
      router.push('/');
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Error al eliminar la cuenta' });
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            href="/cuenta" 
            className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Mi cuenta
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Configuración de cuenta</h1>
          <p className="text-gray-600 mt-2">Gestiona tu información personal y preferencias</p>
        </div>

        {/* Mensaje de feedback */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            )}
            <p className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
              {message.text}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar con pestañas */}
          <div className="lg:col-span-1">
            <nav className="space-y-2 bg-white rounded-lg shadow p-4">
              <button
                onClick={() => setActiveTab('perfil')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'perfil'
                    ? 'bg-green-50 text-green-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <User className="h-5 w-5" />
                <span>Perfil</span>
              </button>
              
              <button
                onClick={() => setActiveTab('seguridad')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'seguridad'
                    ? 'bg-green-50 text-green-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Shield className="h-5 w-5" />
                <span>Seguridad</span>
              </button>
              
              <button
                onClick={() => setActiveTab('preferencias')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'preferencias'
                    ? 'bg-green-50 text-green-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Bell className="h-5 w-5" />
                <span>Preferencias</span>
              </button>
            </nav>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow">
              {/* Pestaña: Perfil */}
              {activeTab === 'perfil' && (
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <User className="h-5 w-5 text-green-600" />
                      Información personal
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Actualiza tu información de contacto
                    </p>
                  </div>

                  <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre *
                        </label>
                        <input
                          type="text"
                          id="nombre"
                          value={profile.nombre}
                          onChange={(e) => setProfile({ ...profile, nombre: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700 mb-2">
                          Apellidos
                        </label>
                        <input
                          type="text"
                          id="apellidos"
                          value={profile.apellidos}
                          onChange={(e) => setProfile({ ...profile, apellidos: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Usaremos este email para enviarte confirmaciones de pedidos
                      </p>
                    </div>

                    <div>
                      <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="telefono"
                        value={profile.telefono}
                        onChange={(e) => setProfile({ ...profile, telefono: e.target.value })}
                        placeholder="+34 600 000 000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="btn btn-primary flex items-center gap-2"
                      >
                        <Save className="h-4 w-4" />
                        {isSaving ? 'Guardando...' : 'Guardar cambios'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Pestaña: Seguridad */}
              {activeTab === 'seguridad' && (
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <Lock className="h-5 w-5 text-green-600" />
                      Seguridad de la cuenta
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Gestiona tu contraseña y seguridad
                    </p>
                  </div>

                  <form onSubmit={handlePasswordSubmit} className="space-y-6 mb-8">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Contraseña actual *
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          id="currentPassword"
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Nueva contraseña *
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          id="newPassword"
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-10"
                          required
                          minLength={8}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Mínimo 8 caracteres
                      </p>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Confirmar nueva contraseña *
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="btn btn-primary flex items-center gap-2"
                      >
                        <Lock className="h-4 w-4" />
                        {isSaving ? 'Actualizando...' : 'Cambiar contraseña'}
                      </button>
                    </div>
                  </form>

                  {/* Zona peligrosa */}
                  <div className="pt-6 border-t border-red-200">
                    <h3 className="text-lg font-semibold text-red-900 mb-2">Zona peligrosa</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, está seguro.
                    </p>
                    <button
                      type="button"
                      onClick={handleDeleteAccount}
                      className="btn btn-outline border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400"
                    >
                      Eliminar mi cuenta
                    </button>
                  </div>
                </div>
              )}

              {/* Pestaña: Preferencias */}
              {activeTab === 'preferencias' && (
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <Bell className="h-5 w-5 text-green-600" />
                      Preferencias de comunicación
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Elige cómo quieres que nos comuniquemos contigo
                    </p>
                  </div>

                  <form onSubmit={handlePreferencesSubmit} className="space-y-6">
                    {/* Notificaciones por email */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Notificaciones por email
                      </h3>
                      
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.emailPedidos}
                          onChange={(e) => setPreferences({ ...preferences, emailPedidos: e.target.checked })}
                          className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">Actualizaciones de pedidos</div>
                          <div className="text-sm text-gray-500">
                            Recibe confirmaciones, actualizaciones de envío y notificaciones de entrega
                          </div>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.emailPromociones}
                          onChange={(e) => setPreferences({ ...preferences, emailPromociones: e.target.checked })}
                          className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">Promociones y ofertas</div>
                          <div className="text-sm text-gray-500">
                            Recibe noticias sobre nuevos productos, descuentos y ofertas especiales
                          </div>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.emailRecomendaciones}
                          onChange={(e) => setPreferences({ ...preferences, emailRecomendaciones: e.target.checked })}
                          className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">Consejos y recomendaciones</div>
                          <div className="text-sm text-gray-500">
                            Recibe consejos sobre el cuidado de bonsais y recomendaciones personalizadas
                          </div>
                        </div>
                      </label>
                    </div>

                    {/* Idioma */}
                    <div className="pt-6 border-t border-gray-200">
                      <label htmlFor="idioma" className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Idioma
                      </label>
                      <select
                        id="idioma"
                        value={preferences.idioma}
                        onChange={(e) => setPreferences({ ...preferences, idioma: e.target.value })}
                        className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="es">Español</option>
                        <option value="en">English</option>
                        <option value="ca">Català</option>
                      </select>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="btn btn-primary flex items-center gap-2"
                      >
                        <Save className="h-4 w-4" />
                        {isSaving ? 'Guardando...' : 'Guardar preferencias'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
