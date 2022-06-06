<%@ WebHandler Language="VB" Class="Chofer" %>

Imports System
Imports System.Web
Imports System.IO
Imports System.Data

Public Class Chofer : Implements IHttpHandler
    
    Dim path As String
    Dim imga, imgr As HttpPostedFile
    Dim flag, empresa, pidm, nro_licencia, fecha_expedicion, fecha_renovacion, fecha_inicio, fecha_fin, ruta_anverso, ruta_reverso, activo, user, codeimag_anverso, codeimag_reverso, usuario As String
    Dim dt As DataTable
    Dim resb As New StringBuilder
    Dim res As String
    Dim P As New Nomade.NC.NCEChofer("Bn")
    Dim flag2 As String

    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"

        flag = context.Request("flag")
        
        imga = context.Request.Files("imga")
        imgr = context.Request.Files("imgr")
        empresa = context.Request("empr")
        pidm = context.Request("pidm")
        nro_licencia = context.Request("nrol")
        fecha_expedicion = Utilities.fechaLocal(context.Request("feex"))
        fecha_renovacion = Utilities.fechaLocal(context.Request("fere"))
         usuario=context.Request("usua") 
        fecha_inicio = Utilities.fechaLocal(context.Request("fein"))
      
        fecha_fin = context.Request("fefi")
        If fecha_fin <> String.Empty Then
            fecha_fin = Utilities.fechaLocal(context.Request("fefi"))
        End If

        activo = context.Request("acti")
        user = context.Request("user")
        codeimag_anverso = context.Request("coima")
        codeimag_reverso = context.Request("coimr")
        ruta_anverso = context.Request("ruima")
        ruta_reverso = context.Request("ruimr")
               
        Try
            
            Select Case flag.ToString

                    
                Case "1"
                    If Not imga Is Nothing Then
                        ruta_anverso = GrabaImagen(imga, context, pidm & "_AN.jpg")
                    End If
                    If Not imgr Is Nothing Then
                        ruta_reverso = GrabaImagen(imgr, context, pidm & "_RE.jpg")
                    End If
                    Dim p As New Nomade.NC.NCEChofer("BN")
                    res = CrearChofer(empresa, pidm, nro_licencia, fecha_expedicion, fecha_renovacion, fecha_inicio, fecha_fin, ruta_anverso, ruta_reverso, activo, user)
                                                          
                Case "2"
                    Dim p As New Nomade.NC.NCEChofer("BN")
                    If Not imga Is Nothing Then
                        ruta_anverso = GrabaImagen(imga, context, pidm & "_AN.jpg")
                    End If
                    If Not imgr Is Nothing Then
                        ruta_reverso = GrabaImagen(imgr, context, pidm & "_RE.jpg")
                    End If
                    res = ActualizarChofer(empresa, pidm, nro_licencia, fecha_expedicion, fecha_renovacion, fecha_inicio, fecha_fin, ruta_anverso, ruta_reverso, codeimag_anverso, codeimag_reverso, activo, user)
  
                Case "3"
                    
                    Dim p As New Nomade.NC.NCEChofer("BN")
                    dt = p.ListarChofer(pidm, empresa, String.Empty)
                    context.Response.ContentType = "application/json; charset=utf-8"
       
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""EMPRESA"" :" & """" & dt.Rows(0)("EMPRESA") & """,")
                    resb.Append("""LICENCIA"" :" & """" & dt.Rows(0)("LICENCIA") & """,")
                    resb.Append("""EXPEDICION"" :" & """" & dt.Rows(0)("EXPEDICION") & """,")
                    resb.Append("""RENOVACION"" :" & """" & dt.Rows(0)("RENOVACION") & """,")
                    resb.Append("""FECHA_INICIO"" :" & """" & dt.Rows(0)("FECHA_INICIO") & """,")
                    resb.Append("""FECHA_FIN"" :" & """" & dt.Rows(0)("FECHA_FIN") & """,")
                    resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """,")
                    resb.Append("""RUTA_ANVERSO"" :" & """" & dt.Rows(0)("RUTA_ANVERSO") & """,")
                    resb.Append("""COD_ANVERSO"" :" & """" & dt.Rows(0)("COD_ANVERSO") & """,")
                    resb.Append("""RUTA_REVERSO"" :" & """" & dt.Rows(0)("RUTA_REVERSO") & """,")
                    resb.Append("""COD_REVERSO"" :" & """" & dt.Rows(0)("COD_REVERSO") & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                    
                Case "4"
                    Dim p As New Nomade.NC.NCEmpresa("BN")
                    dt = p.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    res = GenerarSelect(dt, "slcEmpresachof", "codigo", "descripcion", "EMPRESA")

            End Select
            
            context.Response.Write(res)
            
            
        Catch ex As Exception
            
            context.Response.Write("error" & ex.ToString)
            
        End Try
        
        
        
        
    End Sub
 
    
    Public Function CrearChofer(ByVal p_empresa As String, ByVal p_pidm As String, ByVal p_nro_licencia As String, ByVal p_fecha_expedicion As String, ByVal p_fecha_renovacion As String, ByVal p_fecha_inicio As String, ByVal p_fecha_fin As String, ByVal p_ruta_anverso As String, ByVal p_ruta_reverso As String, ByVal p_activo As String, ByVal p_user As String) As String
        Dim datos(3) As String
        datos = P.CrearChofer(p_empresa, p_pidm, p_nro_licencia, p_fecha_expedicion, p_fecha_renovacion, p_fecha_inicio, p_fecha_fin, p_ruta_anverso, p_ruta_reverso, p_activo, p_user)
         
        Return (datos(1) + "|" + datos(2))
        
    End Function
   
    
    
    
    Public Function ActualizarChofer(ByVal p_empresa As String, ByVal p_pidm As String, ByVal p_nro_licencia As String, ByVal p_fecha_expedicion As String, ByVal p_fecha_renovacion As String, ByVal p_fecha_inicio As String, ByVal p_fecha_fin As String, ByVal p_ruta_anverso As String, ByVal p_ruta_reverso As String, ByVal p_codeimag_anverso As String, ByVal p_codeimag_reverso As String, ByVal p_activo As String, ByVal p_user As String) As String
        Dim datos As String
        datos = P.ActualizarChofer(p_empresa, p_pidm, p_nro_licencia, p_fecha_expedicion, p_fecha_renovacion, p_fecha_inicio, p_fecha_fin, p_ruta_anverso, p_ruta_reverso, p_codeimag_anverso, p_codeimag_reverso, p_activo, p_user)
        Return datos
    End Function
    
    
  
      
    Public Function GenerarSelect(ByVal dt As DataTable, ByVal id As String, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then
            res = "<select class=""span12"" id=""" & id & """>"
            res += "<option value=""0""><option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
            Next
            res += "</select>"
        Else
            res = "error"
        End If
        Return res
    End Function

    Public Function GrabaImagen(ByVal img As HttpPostedFile, ByVal context As HttpContext, ByVal nombrearchivo As String) As String
        Dim rp As String = String.Empty
        Try

            
            Dim savepath As String = "" 'path fisico del server
            Dim tempPath As String = "" 'path ../../ para src
            tempPath = "../" & System.Configuration.ConfigurationManager.AppSettings("Imagenes") & "/licencias"
            savepath = context.Server.MapPath(tempPath)
            Dim filename As String = nombrearchivo
            If Not Directory.Exists(savepath) Then
                Directory.CreateDirectory(savepath)
            End If
        
            img.SaveAs(savepath & "\" & filename)
            'context.Response.Write(tempPath & "/" & filename)
            rp = tempPath & "/" & filename
            context.Response.StatusCode = 200

            
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
     
        
       
        Return rp
    End Function
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class