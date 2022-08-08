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

        private string username = "20487686019";
        private ConnectionInfo conexion;
        private List<AuthenticationMethod> listMetodos = new List<AuthenticationMethod>();

        //private static PrivateKeyFile keyFile = new PrivateKeyFile(ConfigurationSettings.AppSettings["PathKeyEfact"].ToString() + "finalkey.ppk");
        //private PrivateKeyFile[] keyFiles = new[] { keyFile };

        private PrivateKeyFile[] keyFiles = new[] { new PrivateKeyFile(ConfigurationManager.AppSettings["PathKeyEfact"].ToString() + "finalkey.ppk") };

        public Conexion()
        {
            //this.listMetodos.Add(new PasswordAuthenticationMethod(this.username, "2d0798d0f41acc49"));  TESTING
            this.listMetodos.Add(new PasswordAuthenticationMethod(this.username, "edec1be07ee8428b"));

            this.listMetodos.Add(new PrivateKeyAuthenticationMethod(this.username, this.keyFiles));
            //this.conexion = new ConnectionInfo("dev-gw.efact.pe", 22, this.username, this.listMetodos.ToArray());
            this.conexion = new ConnectionInfo("prd-gw3.efact.pe", 22, this.username, this.listMetodos.ToArray());

        }

        public string fnDescargaArchivo(string sRutaArchivo)
        {
            try
            {
                var sDescargado = "";
                var localPath = Path.GetDirectoryName(sRutaArchivo) + @"\DocumentosDeclarados/";
                var sNombreArchivo = Path.GetFileName(sRutaArchivo).Split('.')[0];

                if (!File.Exists(localPath + sNombreArchivo + ".pdf")) // si no esta descargado aun en el servidor
                {

                    using (var client = new SftpClient(conexion))
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

        public string fnSubirArchivo(string sRutaArchivo)
        {
            try
            {
                using (var client = new SftpClient(conexion))
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

        public void fnTestConexionFTP()
        {
            try
            {
                using (var client = new SftpClient(conexion))
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
