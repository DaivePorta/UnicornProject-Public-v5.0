using System;
using System.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Renci.SshNet;
using System.IO;

namespace Nomade.Efact.Conexion
{
	public class Conexion
	{		
		public string sRutaSubida = @"/In";

		private readonly string Username = ConfigurationManager.AppSettings["UserEfact"];
		private readonly string Host = ConfigurationManager.AppSettings["HostEfact"];
		private readonly ConnectionInfo ConexionSFTP;
		private readonly List<AuthenticationMethod> ListMetodos = new List<AuthenticationMethod>();
		
		private readonly PrivateKeyFile[] KeyFiles = new[] { new PrivateKeyFile(ConfigurationManager.AppSettings["PathKeyEfact"].ToString() + "finalkey.ppk") };

		public Conexion(){
			//this.listMetodos.Add(new PasswordAuthenticationMethod(this.username, "2d0798d0f41acc49"));  TESTING
			//this.listMetodos.Add(new PasswordAuthenticationMethod(this.Username, "edec1be07ee8428b"));
			
			this.ListMetodos.Add(new PrivateKeyAuthenticationMethod(this.Username, this.KeyFiles));
			//this.conexion = new ConnectionInfo("dev-gw.efact.pe", 22, this.username, this.listMetodos.ToArray());
			this.ConexionSFTP = new ConnectionInfo(this.Host, 22, this.Username, this.ListMetodos.ToArray());
			
		}

		public string FnDescargaArchivo(string sRutaArchivo) {
			try
			{
				var sDescargado = "";
				var localPath = Path.GetDirectoryName(sRutaArchivo) + @"\DocumentosDeclarados/";
				var sNombreArchivo = Path.GetFileName(sRutaArchivo).Split('.')[0];

				if (!File.Exists(localPath + sNombreArchivo + ".pdf")) // si no esta descargado aun en el servidor
				{

					using (var client = new SftpClient(ConexionSFTP))
					{
						client.Connect();
						var files = client.ListDirectory(@"/Out");
						foreach (var file in files)
						{
							if (sNombreArchivo == file.Name.Split('.')[0])
							{
								using (var fs = new FileStream(localPath + file.Name, FileMode.Create))
								{
									client.DownloadFile(file.FullName, fs);
									if (file.Name.Split('.')[1] == "pdf")
									{
										sDescargado = localPath + file.Name;
									}

									fs.Close();
								}
							}
						}
						client.Disconnect();
					}
				}
				else
				{
					sDescargado = localPath + sNombreArchivo + ".pdf";
				}

				return sDescargado;
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}

		public string FnSubirArchivo(string sRutaArchivo)
		{
			try
			{
				using (var client = new SftpClient(ConexionSFTP))
				{
					client.Connect();
					if (client.IsConnected)
					{
						client.ChangeDirectory(sRutaSubida);
						using (var uplfileStream = File.Open(@sRutaArchivo, FileMode.Open))
						{
							client.UploadFile(uplfileStream, Path.GetFileName(sRutaArchivo), true);
						}
						client.Disconnect();
					}
				}

				return "OK";
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}

		public void FnTestConexionFTP()
		{
			try
			{
				using (var client = new SftpClient(ConexionSFTP))
				{
					client.Connect();
					if (client.IsConnected)
					{
						client.Disconnect();
					}
				}
				
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}


	}
}
