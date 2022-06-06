<%@ WebHandler Language="VB" Class="NNMAFPP" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Imports System.Net.Mail
Public Class NNMAFPP : Implements IHttpHandler
    
    
    Dim OPCION As String
    Dim p_CTLG_CODE, p_MES, p_ANIO, p_ESTADO_IND, p_CODIGO, p_COD_AFP_SUNAT, p_NUM_PLANILLA, p_FEC_PRESENTACION, p_USUA_ID, p_ARCHIVO As String
  
  
   
    
    Dim dt As DataTable
    Dim res As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        
        p_MES = context.Request("p_MES")
        p_ANIO = context.Request("p_ANIO")
        p_ESTADO_IND = context.Request("p_ESTADO_IND")
        p_COD_AFP_SUNAT = context.Request("p_COD_AFP_SUNAT")
        p_CODIGO = context.Request("p_CODIGO")
        p_NUM_PLANILLA = context.Request("p_NUM_PLANILLA")
        p_FEC_PRESENTACION = context.Request("p_FEC_PRESENTACION")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_ARCHIVO = context.Request("p_ARCHIVO")
        
        Select Case OPCION
                
         
            Case "1"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim NCRegimenPen As New Nomade.NC.NCRegimenPen("Bn")
                dt = NCRegimenPen.ListarRegimenP("", "", "", "1")
               
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODE"" :" & """" & MiDataRow("Codigo").ToString & """,")
                        resb.Append("""CODE_SUNAT"" :" & """" & MiDataRow("Codigo_Sunat").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("Descripcion").ToString & """,")
                        resb.Append("""FECHA_INI"" :" & """" & MiDataRow("fecha_ini").ToString & """,")
                        resb.Append("""FECHA_FIN"" :" & """" & MiDataRow("fecha_fin").ToString & """,")
                        resb.Append("""ESTADO_ID"" :" & """" & MiDataRow("ESTADO_ID").ToString & """,")
                        resb.Append("""USUA_ID"" :" & """" & MiDataRow("usuario").ToString & """,")
                        resb.Append("""PDIM"" :" & """" & MiDataRow("PDIM").ToString & """,")
                        resb.Append("""TIP"" :" & """" & MiDataRow("TIP").ToString & """,")
                        resb.Append("""PERSONA"" :" & """" & MiDataRow("Persona").ToString & """")
                        
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "2"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
                dt = NNPlanilla.Lista_Detalle_planillas_afp(p_CODIGO)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""NOMBRES"" :" & """" & MiDataRow("NOMBRES").ToString & """,")
                        resb.Append("""CUSSP"" :" & """" & MiDataRow("CUSSP").ToString & """,")
                        resb.Append("""ITEM"" :" & """" & MiDataRow("ITEM").ToString & """,")
                        resb.Append("""REM_BASICA"" :" & """" & MiDataRow("REM_BASICA").ToString & """,")
                        resb.Append("""APORTE_OBLIGATORIO"" :" & """" & MiDataRow("APORTE_OBLIGATORIO").ToString & """,")
                        resb.Append("""COMISION_AFP"" :" & """" & MiDataRow("COMISION_AFP").ToString & """,")
                        resb.Append("""TOTAL_APORTE"" :" & """" & MiDataRow("TOTAL_APORTE").ToString & """,")
                        resb.Append("""PRIMA_SEGURO"" :" & """" & MiDataRow("PRIMA_SEGURO").ToString & """")
         

                       
                      
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "3"
              
                res = Presenta_Planilla_Afp(p_CODIGO, p_NUM_PLANILLA, p_FEC_PRESENTACION, p_USUA_ID)
            Case "SENDMAIL"
                context.Request.ContentType = "text/plain"
               
                Dim mail As New Nomade.Mail.NomadeMail("BN")
                Dim remite As String = ""
                Dim remitente As String = context.Request("REMITENTE")
                    
                'CMENDIETA
                If remitente.Equals("") Then
                    remite = "soporte@orbitum.org"
                Else
                    remite = remitente
                End If
                    
                Dim nremitente As String = context.Request("NREMITENTE")
                Dim destinatarios As String = context.Request("DESTINATARIOS")
                Dim asunto As String = context.Request("ASUNTO")
                Dim mensaje As String = context.Request("MENSAJE")
                    
                Dim empresa As String = context.Request("EMPRESA")
                Dim htmlMensaje As String = context.Request("HTMLMENSAJE")
                    
                Dim CUERPO As String =
                    "<p>" & mensaje & "</p><hr>" &
                    "<h2>" & empresa & "</h2>" & htmlMensaje
               
                Dim ms As MemoryStream = New MemoryStream()
                Dim img As System.Drawing.Image = Utilities.base642Image(p_ARCHIVO)
                img.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg)
               
                ms.Position = 0
                
              
                mail.enviar(remite, nremitente, destinatarios, asunto, CUERPO, Nothing, New Attachment(ms, "img.jpg", System.Net.Mime.MediaTypeNames.Image.Jpeg))
                
                ms.Close()
                
                res = "OK"
                
                mail = Nothing
            Case Else
        End Select
        context.Response.Write(res)
    End Sub
 
    
    
    
    
    
    Public Function Presenta_Planilla_Afp(p_CODIGO As String, p_NUM_PLANILLA As String, p_FEC_PRESENTACION As String, p_USUA_ID As String) As String
       
        Dim Datos As String
        Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
        
        Try
            Datos = NNPlanilla.Presenta_Planilla_Afp(p_CODIGO, p_NUM_PLANILLA, Utilities.fechaLocal(p_FEC_PRESENTACION), p_USUA_ID)
        Catch ex As Exception
            Datos = "E"
        End Try
      
        NNPlanilla = Nothing
        Return Datos
        
    
        
    
    End Function
    
    
    
    
    
    
    
    
    
    
    
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class