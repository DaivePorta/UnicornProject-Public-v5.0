<%@ WebHandler Language="VB" Class="NCMAGEN" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO

Public Class NCMAGEN : Implements IHttpHandler
         
    Dim OPCION As String
    Dim p_CTLG_CODE, USUA_ID As String
    Dim FILE_TEXT As HttpPostedFile
    Dim res As String
    Dim resb As New StringBuilder
    Dim dt As DataTable
    Dim ncPersona As New Nomade.NC.NCPersona("Bn")
    Dim PIDM, RUC, TIPO, FECHA_INICIO, RESOLUCION As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        
        OPCION = context.Request("OPCION")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        FILE_TEXT = context.Request.Files("FILE_TEXT")
        
        PIDM = context.Request("PIDM")
        TIPO = context.Request("TIPO")
        RUC = context.Request("RUC")
        FECHA_INICIO = context.Request("FECHA_INICIO")
        RESOLUCION = context.Request("RESOLUCION")
        
        USUA_ID = context.Request("USUA_ID")
        
        Try
        
            Select Case OPCION
                        
                Case "0" 'LISTA PERSONAS
                    Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
                    
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncPersona.listar_Persona("S", "")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""ID"" :" & """" & MiDataRow("ID").ToString & """,")
                            resb.Append("""RAZON_SOCIAL"" :" & """" & MiDataRow("NOMBRE").ToString & """,")
                            resb.Append("""NRO_RUC"" :" & """" & MiDataRow("NRO_RUC").ToString & """,")
                            resb.Append("""CODIGO_TIPO_DOCUMENTO"" :" & """" & MiDataRow("CODIGO_TIPO_DOCUMENTO").ToString & """,")
                            resb.Append("""TIPO_DOCUMENTO"" :" & """" & MiDataRow("TIPO_DOCUMENTO").ToString & """,")
                            resb.Append("""NRO_DOCUMENTO"" :" & """" & MiDataRow("NRO_DOCUMENTO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "1" 'CARGAR DATOS DE TXT
                    
                    Dim resp As String = ""
                    If FILE_TEXT Is Nothing Then
                        res = "VACIO"
                    Else
                        
                        Dim FileStream As New StreamReader(FILE_TEXT.InputStream)
                        Dim Data As String = FileStream.ReadToEnd()
                        Dim DataUnida As String = ""
                        resp = "OK"
                        res = Data
                        'Dim values() As String = Data.Split(vbCrLf)
                        'Dim t As Decimal = values.Length
                        'If Not values.Length = 0 Then
                        '    For Each s As String In values
                        '        DataUnida += s
                        '    Next
                        'End If
                    End If
                Case "2"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim array As Array
                    array = ncPersona.ActualizarTipoAgente(PIDM, RUC, TIPO, Utilities.fechaLocal(FECHA_INICIO), RESOLUCION, USUA_ID)
                    If Not (array Is Nothing) Then
                        resb.Append("[{")
                        resb.Append("""RESPUESTA"" :" & """" & array(0).ToString & """")
                        resb.Append("}]")
                    End If
                    res = resb.ToString()
                    
                Case "3" 'ACTUALIZAR TIPO DE TODAS LAS PERSONAS A "N"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    Dim nmGestionProductos As New Nomade.NM.NMGestionProductos("Bn")
                    If TIPO = "R" Then
                        res = nmGestionProductos.ActualizarCampoGenerico("PPBIDEN", "1", "1", "PPBIDEN_AGENTE_RETEN_IND", "N")
                        
                    ElseIf TIPO = "P" Then
                        res = nmGestionProductos.ActualizarCampoGenerico("PPBIDEN", "1", "1", "PPBIDEN_AGENTE_PERCEP_IND", "N")
                        
                    ElseIf TIPO = "B" Then
                        res = nmGestionProductos.ActualizarCampoGenerico("PPBIDEN", "1", "1", "PPBIDEN_BUEN_CONTRIB_IND", "N")

                    End If
                Case "4"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = ncPersona.ListarTipoAgente(PIDM, TIPO)
                    res = GenerarTablaDatosTipoAgente(dt)
                    
                   
            End Select

            context.Response.Write(res)
       
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
        
    End Sub
        
    Function GenerarTablaDatosTipoAgente(ByVal dt As DataTable) As String
        resb.Clear()        '------
        resb.AppendFormat("<table id=""tblDatos"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>PIDM</th>")
        resb.AppendFormat("<th>RUC</th>")
        resb.AppendFormat("<th>RAZÓN SOCIAL</th>")
        resb.AppendFormat("<th>A PARTIR DE</th>")
        resb.AppendFormat("<th>NRO RESOLUCION</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
                                 
        If (dt IsNot Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("PIDM").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RUC").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("PERSONA").ToString())
                resb.AppendFormat("<td align='center' data-order='" + ObtenerFecha(dt.Rows(i)("FECHA_INICIO").ToString) + "'>{0}</td>", dt.Rows(i)("FECHA_INICIO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RESOLUCION").ToString())
                resb.AppendFormat("</tr>")
            Next
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
        

        Return resb.ToString()
    End Function

    
    Function ObtenerFecha(ByVal fecha As String) As String
        If fecha Is Nothing Or fecha = "" Then
            fecha = ""
        Else
            Dim dia = fecha.Split(" ")(0).Split("/")(0)
            Dim mes = fecha.Split(" ")(0).Split("/")(1)
            Dim anio = fecha.Split(" ")(0).Split("/")(2)
            Dim hora = ""
            Dim min = ""
            Dim seg = ""
            If fecha.Split(" ").Length = 3 Then
                hora = fecha.Split(" ")(1).Split(":")(0)
                min = fecha.Split(" ")(1).Split(":")(1)
                seg = fecha.Split(" ")(1).Split(":")(2)
                If fecha.Split(" ")(2).Contains("p") Then
                    If Integer.Parse(hora) < 12 Then
                        hora = (Integer.Parse(hora) + 12).ToString
                    End If
                End If
            End If
            fecha = anio + mes + dia + hora + min + seg
        End If
        Return fecha
    End Function
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class