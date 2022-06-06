<%@ WebHandler Language="VB" Class="NFMCARR" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO

Public Class NFMCARR : Implements IHttpHandler
    
    Dim path As String
    Dim img As HttpPostedFile 
    Dim flag As String
    Dim dt As DataTable
    Dim resb As New StringBuilder
    Dim res As String
    Dim P As New Nomade.NF.NFImagenes("Bn")
    Dim codigo, user, cmtc, desc, carr, acti, rdel, ruta As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        flag = context.Request("flag")
        img = context.Request.Files("img")
        codigo = context.Request("codigo")
        user = context.Request("user")
        cmtc = context.Request("cmtc")
        carr = context.Request("nomb")
        desc = context.Request("defi")
        acti = context.Request("acti")
        rdel = context.Request("rutaelim")
        ruta = context.Request("ruta")
        
        Try
            
            Select Case flag.ToString
                
                Case "1"
                    Dim p As New Nomade.NF.NFCarroceriaUnidad("BN")
                    If Not img Is Nothing Then
                        ruta = GrabaImagen(img, context, carr.Replace(" ", "_") + ".jpg")
                    End If
                    res = p.CrearCarroceriaUnidad(carr, desc, cmtc, ruta, acti, user)
                    
                Case "2"
                    Dim p As New Nomade.NF.NFCarroceriaUnidad("BN")
                    If Not img Is Nothing Then
                        ruta = GrabaImagen(img, context, carr.Replace(" ", "_") + ".jpg")
                    End If
                    res = p.ActualizarCarroceriaUnidad(codigo, carr, desc, cmtc, ruta, acti, user)
               
                Case "3"
                    Dim p As New Nomade.NF.NFCarroceriaUnidad("BN")
                    res = p.CambiarEstadoCarroceriaUnidad(codigo) 'cambiar estado Inactivo/Activo
                       
                    'Case "4" 'GRABA IMAGENES
                    '    path = GrabaImagen(img, context)
                    '    Dim p As New NOMADE.NF.NFImagenes("BN")                  
                    '    p.CrearImagen(codigo, "C", path, user)
                    '    res = path
                    
                    'Case "5"
                    '    Dim p As New NOMADE.NF.NFImagenes("BN")
                    '    dt = p.ListarImagen(codigo, "C")
                    '    context.Response.ContentType = "application/json; charset=utf-8"
                   
                    '    If Not dt Is Nothing Then
                    '        resb.Append("[")
                    '        For i As Integer = 0 To dt.Rows.Count - 1
                    '            resb.Append("{")
                    '            resb.Append("""RUTA"" :" & """" & dt.Rows(i)("RUTA") & """,")
                    '            resb.Append("""CODIGO"" :" & """" & dt.Rows(i)("CODIGO") & """")
                    '            resb.Append("}")
                    '            If i <> dt.Rows.Count - 1 Then
                    '                resb.Append(",")
                    '            End If
                    '        Next
                    '        resb.Append("]")
                    '        res = resb.ToString()
                    '    Else : res = "error"
                    '    End If
                    
                    
                Case "6"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.NF.NFCarroceriaUnidad("BN")
                    dt = p.ListarCarroceriaUnidad(codigo, String.Empty, String.Empty)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""CARROCERIA"" :" & """" & dt.Rows(0)("CARROCERIA") & """,")
                    resb.Append("""MTC"" :" & """" & dt.Rows(0)("MTC") & """,")
                    resb.Append("""DESCRIPCION"" :" & """" & dt.Rows(0)("DESCRIPCION").ToString().Replace(vbCrLf, "\n").Replace("""", "\""") & """,")
                    resb.Append("""ACTIVO"" :" & """" & dt.Rows(0)("ESTADO") & """,")
                    resb.Append("""IMAGEN"" :" & """" & dt.Rows(0)("IMAGEN") & """")
   
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                      
                    'Case "7"
                    '    Dim p As New NOMADE.NF.NFImagenes("BN")
                    '    p.EliminarImagen(codigo) 'eliminacion logica bd
                    '    res = EliminaImagen(rdel, context) 'eliminacion fisica del servr
           
            End Select
            
            context.Response.Write(res)
            
            
        Catch ex As Exception
            
            context.Response.Write("error" & ex.ToString)
            
        End Try
    End Sub
 
    
    'Public Function EliminaImagen(ByVal ruta As String, ByVal context As HttpContext) As String
    '    Dim rp As String = String.Empty
    '    Try
    '        Dim path As String = context.Server.MapPath(ruta)
    '        File.Delete(path)
    '        rp = "archivo eliminado"
    '    Catch ex As Exception
    '        context.Response.Write("error" & ex.ToString)
    '    End Try
        
    '    Return rp
    'End Function
    
    
    Public Function GrabaImagen(ByVal img As HttpPostedFile, ByVal context As HttpContext, ByVal nombrearch As String) As String
        Dim rp As String = String.Empty
        Try
                   
            Dim savepath As String = "" 'path fisico del server
            Dim tempPath As String = "" 'path ../../ para src
            tempPath = System.Configuration.ConfigurationManager.AppSettings("PathImageCarrocerias")
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
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class