<%@ WebHandler Language="VB" Class="NCMRDNI" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMRDNI : Implements IHttpHandler
    
    Dim res, flag, res_aux As String
    Dim resb As New StringBuilder
    Dim dt As DataTable
    Dim codigo, usuario As String
    Dim firmante As String
    Dim codeimag_anverso As String
    Dim codeimag_reverso As String
    Dim ruta_anverso As String
    Dim ruta_reverso As String
    Dim p As New Nomade.NC.NCImagenDNIPersona("Bn")
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        
        flag = context.Request("flag")
        codigo = context.Request("codigo")
        
        ruta_anverso = context.Request("ruima")
        ruta_reverso = context.Request("ruimr")
        usuario = context.Request("usuario")
        
        
        
        Try
        
            Select Case flag.ToString
                Case "1"
                    '   context.Response.ContentType = "application/json; charset=utf-8"
                    res_aux = "[{"
                    res_aux = res_aux & """ESTADO"":""OK"","
                    res_aux = res_aux & """RUTA_ANVERSO"":""" & CrearImagen(codigo, ruta_anverso, "D", usuario) & ""","
                    res_aux = res_aux & """RUTA_REVERSO"":""" & CrearImagen(codigo, ruta_reverso, "E", usuario) & """"
                    res_aux = res_aux & "}]"
                    res = res_aux
                Case "2"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarImagen(codigo, "N")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""RUTA_ANVERSO"" :" & """" & dt.Rows(0)("RUTA_ANVERSO") & """,")
                        resb.Append("""RUTA_REVERSO"" :" & """" & dt.Rows(1)("RUTA_REVERSO") & """")
                        resb.Append("}")
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "3"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarImagen(codigo, "S")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""NOMBRE"" :" & """" & dt.Rows(0)("NOMBRE") & """,")
                        resb.Append("""PIDM"" :" & """" & dt.Rows(0)("PIDM") & """")
                        resb.Append("}")
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
 
    Public Function GenerarSelect(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then
         
            res = "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                If clase = "EMPRESA" Then
                    res += "<option pidm=""" & dt.Rows(i)("PIDM").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                Else
                    res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                End If
            Next
          
        Else
            res = "error"
        End If
        Return res
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