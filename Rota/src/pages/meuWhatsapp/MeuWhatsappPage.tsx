import { useState, useEffect } from 'react';
import { supabase } from '../../infra/superBaseClient';

export default function MeuWhatsappPage() {
  const [loading, setLoading] = useState(false);
  const [conectado, setConectado] = useState(false);
  const [numero, setNumero] = useState('');
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('whatsapp_conectado, whatsapp_numero')
        .eq('id', user.id)
        .single();

      if (profile) {
        setConectado(profile.whatsapp_conectado || false);
        setNumero(profile.whatsapp_numero || '');
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  }

  async function conectarWhatsapp() {
    setLoading(true);
    setQrCode('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Não autenticado');

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/conectar-whatsapp`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      // Mostra o QR Code
      if (data.qrcode?.base64) {
        setQrCode(data.qrcode.base64);
      } else {
        alert('Instância criada! QR Code não disponível ainda, aguarde e recarregue.');
      }

    } catch (error: any) {
      alert(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function desconectarWhatsapp() {
    if (!confirm('Deseja realmente desconectar o WhatsApp?')) return;

    setLoading(true);
    setQrCode('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Não autenticado');

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/desconectar-whatsapp`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setConectado(false);
      setNumero('');
      alert('WhatsApp desconectado com sucesso!');
    } catch (error: any) {
      alert(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Meu WhatsApp</h1>
          <p className="text-gray-400">
            Conecte seu WhatsApp para enviar lembretes automáticos aos motoristas
          </p>
        </div>

        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-700">
              <div>
                <p className="text-sm text-gray-400 mb-1">Status da Conexão</p>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${conectado ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                  <span className="text-2xl font-semibold text-white">
                    {conectado ? 'Conectado' : 'Desconectado'}
                  </span>
                </div>
              </div>
              {conectado && numero && (
                <div className="text-right">
                  <p className="text-sm text-gray-400 mb-1">Número</p>
                  <p className="text-lg font-mono text-[#FE751B]">{numero}</p>
                </div>
              )}
            </div>

            {/* QR CODE */}
            {qrCode && (
              <div className="mb-8 flex flex-col items-center p-6 bg-white rounded-xl">
                <p className="text-gray-800 font-bold text-lg mb-4">
                  📱 Escaneie o QR Code com seu WhatsApp
                </p>
                <img src={qrCode} alt="QR Code WhatsApp" className="w-64 h-64" />
                <p className="text-gray-500 text-sm mt-4 text-center">
                  Abra o WhatsApp → Dispositivos conectados → Conectar dispositivo
                </p>
              </div>
            )}

            <div className="mb-8 p-6 bg-gray-900/50 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">ℹ️</span>
                Como funciona
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#FE751B] mt-1">•</span>
                  <span>Conecte seu WhatsApp pessoal ao sistema</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FE751B] mt-1">•</span>
                  <span>As mensagens de lembrete sairão do SEU número</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FE751B] mt-1">•</span>
                  <span>Lembretes são enviados 2 horas após o horário de descarga</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FE751B] mt-1">•</span>
                  <span>Apenas viagens criadas por você enviarão do seu WhatsApp</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-4">
              {!conectado ? (
                <button
                  onClick={conectarWhatsapp}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-[#FE751B] to-orange-600 hover:from-orange-600 hover:to-[#FE751B] text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-orange-500/30"
                >
                  {loading ? 'Conectando...' : '📱 Conectar WhatsApp'}
                </button>
              ) : (
                <button
                  onClick={desconectarWhatsapp}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-red-500/30"
                >
                  {loading ? 'Desconectando...' : '🔌 Desconectar WhatsApp'}
                </button>
              )}
            </div>
          </div>
        </div>

        {!conectado && !qrCode && (
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
            <p className="text-yellow-200 text-sm flex items-start gap-2">
              <span className="text-lg">⚠️</span>
              <span>
                <strong>Importante:</strong> Após conectar, você precisará escanear o QR Code do WhatsApp.
                Mantenha seu telefone por perto!
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}