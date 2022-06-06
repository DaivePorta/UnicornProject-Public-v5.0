<%@ WebHandler Language="VB" Class="NCMEIMG" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO

Public Class NCMEIMG : Implements IHttpHandler
    
    Dim OPCION As String
    Dim p_CTLG_CODE, USUA_ID As String
    Dim IMG_SUPERIOR As HttpPostedFile
    Dim IMG_INFERIOR As HttpPostedFile
    Dim RUTA_SUPERIOR As String = ""
    Dim RUTA_INFERIOR As String = ""

    
    Dim p As New Nomade.NC.NCImagenDNIPersona("Bn")
    Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
    Dim res As String
    Dim resb As New StringBuilder
    Dim dt As DataTable
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        
        OPCION = context.Request("OPCION")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        USUA_ID = context.Request("USUA_ID")
        IMG_SUPERIOR = context.Request.Files("IMG_SUPERIOR")
        IMG_INFERIOR = context.Request.Files("IMG_INFERIOR")
        RUTA_SUPERIOR = context.Request("RUTA_SUPERIOR")
        RUTA_INFERIOR = context.Request("RUTA_INFERIOR")
        
        Try
        
            Select Case OPCION
                
                Case "CTLG" 'Listar empresas
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncEmpresa.ListarEmpresa(String.Empty, "A", context.User.Identity.Name)
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""RUC"" :" & """" & MiDataRow("RUC").ToString & """,")
                            resb.Append("""CORTO"" :" & """" & MiDataRow("CORTO").ToString & """,")
                            resb.Append("""IMG_SUPERIOR"" :" & """" & MiDataRow("IMG_SUPERIOR").ToString & """,")
                            resb.Append("""IMG_INFERIOR"" :" & """" & MiDataRow("IMG_INFERIOR").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                    
                Case "1" 'GRABAR IMAGEN
                    
                    If Not IMG_SUPERIOR Is Nothing Then
                        RUTA_SUPERIOR = GrabaImagen(IMG_SUPERIOR, context, p_CTLG_CODE + "_imgSuperior.jpg")
                    End If
                    
                    If Not IMG_INFERIOR Is Nothing Then
                        RUTA_INFERIOR = GrabaImagen(IMG_INFERIOR, context, p_CTLG_CODE + "_imgInferior.jpg")
                    End If
                    
                    Dim resp As String = ""
                    resp = ncEmpresa.ActualizarImagenesReportes(p_CTLG_CODE, RUTA_SUPERIOR, RUTA_INFERIOR)
                 
                    resb.Append("[{")
                    If resp = "OK" Then
                        resb.Append("""SUCCESS"" :""" + resp + """")
                    Else
                        resb.Append("""SUCCESS"" :""ERROR""")
                    End If
                    resb.Append("}]")
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
            tempPath = System.Configuration.ConfigurationManager.AppSettings("PathImageCtlgEncabezados")
            savepath = context.Server.MapPath(tempPath)

            Dim filename As String = nombrearch

            If Not Directory.Exists(savepath) Then
                Directory.CreateDirectory(savepath)
            End If
        
            img.SaveAs(savepath & "\" & filename)
            rp = tempPath & "/" & filename
            context.Response.StatusCode = 200
      
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
       
        Return rp
    End Function
         
    Public Function CrearImagen(ByVal p_pidm As String, ByVal p_ruta As String, ByVal p_tipo As String, ByVal p_user As String) As String
        Dim datos(3) As String
        datos = p.CrearImagen(p_pidm, p_ruta, p_tipo, p_user)
         
        Return (datos(1))
        
    End Function
    
         
    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function
    
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class