using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using QRCoder;
using System.Data;

namespace Nomade.Impresion
{
    //DPORTA 15/09/2022 - RF SE RETIRA DEL TENIS :(
    public class CodigoQR
    {
        private Connection cn;

        public CodigoQR(String str)
        {
            this.cn = new Connection(str);
        }        
        public string fnGetCodigoQR(string informacionQR) {

            var qrGenerator = new QRCodeGenerator();
            var qrCodeData = qrGenerator.CreateQrCode(informacionQR, QRCodeGenerator.ECCLevel.Q);
            BitmapByteQRCode bitMapByteCode = new BitmapByteQRCode(qrCodeData);
            var bitMap = bitMapByteCode.GetGraphic(20);

            byte[] byteImage;
            MemoryStream MS = new MemoryStream();
            MS.Write(bitMap, 0, bitMap.Length);
            byteImage = MS.ToArray();

            return Convert.ToBase64String(byteImage);
        }
    }
}
