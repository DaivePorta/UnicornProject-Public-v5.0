<%@ WebHandler Language="VB" Class="NCMRFIR" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Public Class NCMRFIR : Implements IHttpHandler
    
    Dim res, flag, res_aux As String
    Dim resb As New StringBuilder
    Dim dt As DataTable
    Dim codigo, usuario As String
    Dim firmante As String
    Dim codeimag_anverso As String
    Dim codeimag_reverso, ruta, carr As String
    Dim img As HttpPostedFile
    Dim ruta_reverso As String
    
    Dim p As New Nomade.NC.NCImagenDNIPersona("Bn")
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        
     
        codigo = context.Request("codigo")
        flag = context.Request("flag")
        img = context.Request.Files("img")
        carr = context.Request("codigo")
        ruta = context.Request("ruta")
       
        
        
        Try
        
            Select Case flag.ToString
                Case "1"
                    
                    'hola
                 
                    If Not img Is Nothing Then
                        ruta = GrabaImagen(img, context, carr.Replace(" ", "_") + ".jpg")
                    End If
                    Dim resp As String = p.CrearFirma(codigo, ruta)
                    
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""SUCCESS"" :" & """" + resp + """")
                    resb.Append("}")
                    resb.Append("]")
                    
                     res = resb.ToString()
                    
                Case "2"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarImagenFirma(codigo, "1")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""PIDM"" :" & """" & dt.Rows(0)("PIDM") & """,")
                        resb.Append("""NOMBRE"" :" & """" & dt.Rows(0)("NOMBRE") & """,")
                        resb.Append("""IMAGEN"" :" & """" & dt.Rows(0)("FIRMA") & """")
                        resb.Append("}")
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "3"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    
                    dt = p.ListarImagenFirma(codigo, "2")
                  
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""NOMBRES"" :" & """" & MiDataRow("NOMBRE").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "L"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim q As New NOMADE.NC.NCPersona("Bn")
                    dt = q.listar_Persona_Natural_Corto(0, "", "")
                    SortDataTableColumn(dt, "NOMBRE", "ASC")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""NOMBRE"" :" & """" & Trim(MiDataRow("APELL_PATE").ToString & " " & MiDataRow("APELL_MATE").ToString & " " & MiDataRow("NOMBRE").ToString) & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                
            End Select

            context.Response.Write(res)
       
        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)
            
        End Try
        
    End Sub
 
    Public Function GrabaImagen(ByVal img As HttpPostedFile, ByVal context As HttpContext, ByVal nombrearch As String) As String
        Dim rp As String = String.Empty
        Try
                   
            Dim savepath As String = "" 'path fisico del server
            Dim tempPath As String = "" 'path ../../ para src
            tempPath = System.Configuration.ConfigurationManager.AppSettings("PathImageFirmas")
            savepath = context.Server.MapPath(tempPath)
    

            Dim filename As String = nombrearch
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
     
    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function
    
    
    Public Function CrearImagen(ByVal p_pidm As String, ByVal p_ruta As String, ByVal p_tipo As String, ByVal p_user As String) As String
        Dim datos(3) As String
        datos = p.CrearImagen(p_pidm, p_ruta, p_tipo, p_user)
         
        Return (datos(1))
        
    End Function
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class