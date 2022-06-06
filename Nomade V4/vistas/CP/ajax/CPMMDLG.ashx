<%@ WebHandler Language="VB" Class="CPMMDLG" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CPMMDLG : Implements IHttpHandler
       
    Dim OPCION As String
    Dim p_CTLG_CODE As String
    Dim p_CODE, p_DESC, p_DESC_CORTA, p_ESTADO_IND, p_USUA_ID As String
       
    Dim glLetras As New Nomade.GL.GLLetras("Bn")
    Dim cpModuloGasto As New Nomade.CP.CPModuloGasto("Bn")
    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        
        OPCION = context.Request("OPCION")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_CODE = context.Request("p_CODE")
        p_DESC = vChar(context.Request("p_DESC"))
        p_DESC_CORTA = vChar(context.Request("p_DESC_CORTA"))
        p_ESTADO_IND = context.Request("p_ESTADO_IND")
        
        Try
            Select Case OPCION
                     
                Case "1" 'CREAR        
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim array As Array
                    array = cpModuloGasto.CrearModuloGasto(p_DESC, p_DESC_CORTA, p_ESTADO_IND, p_USUA_ID)
                    If Not (array Is Nothing) Then
                        resb.Append("[{")
                        resb.Append("""RESPUESTA"" :" & """" & array(0).ToString & """,")
                        resb.Append("""CODIGO"" :" & """" & array(1).ToString & """")
                        resb.Append("}]")
                    Else
                        resb.Append("[]")
                    End If
                    res = resb.ToString()
                Case "2" 'ACTUALIZAR        
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim array As Array
                    array = cpModuloGasto.ActualizarModuloGasto(p_CODE, p_DESC, p_DESC_CORTA, p_ESTADO_IND, p_USUA_ID)
                    If Not (array Is Nothing) Then
                        resb.Append("[{")
                        resb.Append("""RESPUESTA"" :" & """" & array(0).ToString & """,")
                        resb.Append("""CODIGO"" :" & """" & array(1).ToString & """")
                        resb.Append("}]")
                    Else
                        resb.Append("[]")
                    End If
                    res = resb.ToString()
              
                Case "3" ' LISTAR  JSON
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = cpModuloGasto.ListarModuloGasto(If(p_CODE = Nothing, "", p_CODE), If(p_DESC = Nothing, "", p_DESC), If(p_DESC_CORTA = Nothing, "", p_DESC_CORTA),
                                                         If(p_ESTADO_IND = Nothing, "", p_ESTADO_IND), If(p_USUA_ID = Nothing, "", p_USUA_ID))
                    
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.AppendFormat("""CODIGO"" :""{0}"",", MiDataRow("CODIGO").ToString)
                            resb.AppendFormat("""DESC"" :""{0}"",", MiDataRow("DESCRIPCION").ToString)
                            resb.AppendFormat("""DESC_CORTA"" :""{0}"",", MiDataRow("DESC_CORTA").ToString)
                            resb.AppendFormat("""ESTADO_IND"" :""{0}"",", MiDataRow("ESTADO_IND").ToString)
                            resb.AppendFormat("""USUA_ID"" :""{0}"",", MiDataRow("USUA_ID").ToString)
                            resb.AppendFormat("""FECHA_ACTV"" :""{0}""", MiDataRow("FECHA_ACTV").ToString)
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString
                Case "4" ' LISTAR  EN TABLA
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = cpModuloGasto.ListarModuloGasto(If(p_CODE = Nothing, "", p_CODE), If(p_DESC = Nothing, "", p_DESC), If(p_DESC_CORTA = Nothing, "", p_DESC_CORTA),
                                                       If(p_ESTADO_IND = Nothing, "", p_ESTADO_IND), If(p_USUA_ID = Nothing, "", p_USUA_ID))
                    res = GenerarTabla(dt)
                    
            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
        
    End Sub
    
    Public Function GenerarTabla(ByVal dt As DataTable) As String
        res = ""
        resb.Clear()
        
        resb.AppendFormat("<table id=""tblTabla"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>CÓDIGO</th>")
        resb.AppendFormat("<th>DESCRIPCIÓN CORTA</th>")
        resb.AppendFormat("<th>DESCRIPCIÓN</th>")
        resb.AppendFormat("<th>ESTADO</th>")
        resb.AppendFormat("<th>USUARIO</th>")
        resb.AppendFormat("<th>FECHA REGISTRO</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
                                 
        If (dt IsNot Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("CODIGO").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("DESCRIPCION").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("DESC_CORTA").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ESTADO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("USUA_ID").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("FECHA_ACTV").ToString())
                resb.AppendFormat("</tr>")
            Next
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
        Return res
    End Function
        
       
    ''' <summary>
    ''' Elimina espacion vacios (trim), cambia (") por ('), reemplaza (/) por vacio
    ''' </summary>
    ''' <param name="campo"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function vChar(ByVal campo As String) As String
        Dim res As String
        If campo IsNot Nothing Then
            res = campo.Trim().Replace("""", "'").Replace("\", " ")
        Else
            res = campo
        End If
        Return res
    End Function
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class