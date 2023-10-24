<%@ WebHandler Language="VB" Class="NCLCAJA" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCLCAJA : Implements IHttpHandler

    Dim OPCION As String

    Dim PIDM As Integer

    Dim CTLG_CODE, USUA_ID, CODIGO, SCSL_CODE, DESC, TIPO, RESP, TELF, USUA_CAJERO, IMP_CODE, ESTADO, INDICADOR, CTAS_CODE As String

    Dim dt As DataTable

    Dim caja As New Nomade.NC.NCCaja("Bn")
    Dim emp As New Nomade.NC.NCEmpresa("Bn")
    Dim suc As New Nomade.NC.NCSucursal("Bn")
    Dim imp As New Nomade.NC.NCImpresora("Bn")
    Dim usu As New Nomade.NS.NSUsuario("Bn")

    Dim res As String
    Dim resb As New StringBuilder
    Const rolCajero = "0019"

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")
        PIDM = context.Request("PIDM")

        USUA_CAJERO = context.Request("USUA_CAJERO")
        USUA_ID = context.Request("USUA_ID")

        CODIGO = context.Request("CODIGO")
        CTLG_CODE = context.Request("CTLG_CODE")
        SCSL_CODE = context.Request("SCSL_CODE")
        DESC = context.Request("DESC")
        TIPO = context.Request("TIPO")
        RESP = context.Request("RESP")
        TELF = context.Request("TELF")

        ESTADO = context.Request("ESTADO")

        IMP_CODE = context.Request("IMP_CODE")
        INDICADOR = context.Request("INDICADOR")

        CTAS_CODE = context.Request("CTAS_CODE")

        Select Case OPCION
            Case "0"
                context.Response.ContentType = "application/json; charset=utf-8"
                'ccabrera 03/02/2014 se agregó parametro usuario responsable
                dt = caja.ListarCaja(IIf(CODIGO = Nothing, "", CODIGO), String.Empty, String.Empty, String.Empty, " ", "")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                        resb.Append("""EMPRESA"":""" & row("EMPRESA").ToString & """,")
                        resb.Append("""SUCURSAL"":""" & row("SUCURSAL").ToString & """,")
                        resb.Append("""TIPO"":""" & row("TIPO").ToString & """,")
                        resb.Append("""DESC_TIPO"":""" & row("DESC_TIPO").ToString & """,")
                        resb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                        resb.Append("""TELEFONO"":""" & row("TELEFONO").ToString & """,")
                        resb.Append("""ANEXO"":""" & row("ANEXO").ToString & """,")
                        resb.Append("""CONTACTO"":""" & row("CONTACTO").ToString & """,")
                        resb.Append("""RESP_ID"":""" & row("RESP_ID").ToString & """,")
                        resb.Append("""RESPONSABLE"":""" & row("RESPONSABLE").ToString & """,")
                        resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """,")
                        resb.Append("""CTA_CONTAB"":""" & row("CTA_CONTAB").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "1"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = caja.ListarCajerosCaja(IIf(CODIGO = Nothing, "", CODIGO), " ")
                resb.Append("[")
                If Not (dt Is Nothing) Then
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""USUARIO"":""" & row("USUARIO").ToString & """,")
                        resb.Append("""CAJERO"":""" & row("CAJERO").ToString & """,")
                        resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                End If
                resb.Append("]")
                resb.Replace("[{}]", "[]")
                res = resb.ToString()
            Case "2"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = imp.ListarImpresoraCaja(String.Empty, String.Empty, IIf(CODIGO = Nothing, " ", CODIGO))
                resb.Append("[")
                If Not (dt Is Nothing) Then
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                        resb.Append("""IMPRESORA"":""" & row("IMPRESORA").ToString & """,")
                        resb.Append("""TIPO"":""" & row("TIPO").ToString & """,")
                        resb.Append("""SERIE"":""" & row("SERIE").ToString & """,")
                        resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                End If
                resb.Append("]")
                resb.Replace("[{}]", "[]")
                res = resb.ToString()
            Case "3"
                context.Response.ContentType = "text/plain"
                res = caja.CrearCaja(CTLG_CODE, SCSL_CODE, TIPO, DESC, TELF, "", "0", "A", IIf(RESP = Nothing, String.Empty, RESP), IIf(CTAS_CODE = Nothing, String.Empty, CTAS_CODE))
            Case "4"
                context.Response.ContentType = "text/plain"
                res = caja.ActualizarCaja(CODIGO, CTLG_CODE, SCSL_CODE, TIPO, DESC, TELF, "", "0", ESTADO, IIf(RESP = Nothing, String.Empty, RESP), IIf(CTAS_CODE = Nothing, String.Empty, CTAS_CODE))
            Case "5"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = usu.listarUsuarioPermiso(" ", CTLG_CODE, " ", "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        If row("ROLC_CODE").ToString Like rolCajero Then
                            resb.Append("{")
                            resb.Append("""USUARIO"":""" & row("USUA_ID").ToString & """,")
                            resb.Append("""NOMBRE"":""" & row("NOMBRE").ToString & """")
                            resb.Append("},")
                        End If
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "6"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = emp.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "7"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = suc.ListarSucursalFast(CTLG_CODE, String.Empty, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                        resb.Append("""EXONERADO"" :" & """" & MiDataRow("EXONERADO").ToString & """,")
                        resb.Append("""BIO_IND"" :" & """" & MiDataRow("BIO_IND").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "8"
                context.Response.ContentType = "text/plain"
                res = caja.CrearCajeroPorCaja(CODIGO, USUA_CAJERO, USUA_ID)
            Case "9"
                context.Response.ContentType = "text/plain"
                res = imp.CrearImpresoraCaja(CODIGO, IMP_CODE, "A", "", "A", USUA_ID)
            Case "10"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = imp.ListarImpresora(" ", "A", " ", CTLG_CODE, SCSL_CODE)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                        resb.Append("""IMPRESORA"":""" & row("IMPRESORA").ToString & """,")
                        resb.Append("""TIPO"":""" & row("TIPO").ToString & """,")
                        resb.Append("""SERIE"":""" & row("SERIE").ToString & """,")
                        resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "11"
                context.Response.ContentType = "text/plain"
                res = caja.ActualizarEstadoCajeroCaja(CODIGO, USUA_CAJERO, ESTADO, USUA_ID)
            Case "12"
                context.Response.ContentType = "text/plain"
                res = imp.EliminarImpresoraCaja(CODIGO, IMP_CODE)
            Case "13"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = usu.listarUsuario(" ", CTLG_CODE, " ", "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""USUARIO"":""" & row("USUARIO").ToString & """,")
                        resb.Append("""NOMBRE"":""" & row("NOMBRE").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "14" 'CCABRERA 03/02/2015 
                context.Response.ContentType = "application/text; charset=utf-8"
                dt = caja.ListarCajasxUsuario(USUA_CAJERO, IIf(CTLG_CODE = "TODOS", "", CTLG_CODE), IIf(SCSL_CODE = "TODOS", "", SCSL_CODE), "", IIf(ESTADO Is Nothing, "", ESTADO))
                res = GenerarTablaCajasxUsuario(dt)
            Case "15" 'CCABRERA 03/02/2015 
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = caja.ListarResponsablesCaja()
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""USUARIO"":""" & row("USUARIO").ToString & """,")
                        resb.Append("""NOMBRE"":""" & row("NOMBRE").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "16" 'CCABRERA 03/02/2015 
                context.Response.ContentType = "application/text; charset=utf-8"
                dt = caja.ListarCaja("", IIf(CTLG_CODE = "TODOS", "", CTLG_CODE), IIf(SCSL_CODE = "TODOS", "", SCSL_CODE), "", ESTADO, USUA_ID)

                dt.Columns.Add("INDICADOR", GetType(String))
                dt.Columns.Add("ESTADO_RESP", GetType(String))
                For Each row As DataRow In dt.Rows
                    row("INDICADOR") = "SI"
                    row("ESTADO_RESP") = ""
                Next

                res = GenerarTablaCajasxUsuario2(dt)
            Case "POS" 'AGARCIA 09/03/2015
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pos As New Nomade.NC.NCPOS("BN")
                dt = pos.ListarPOS(String.Empty, CTLG_CODE, SCSL_CODE, String.Empty, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                        resb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                        resb.Append("""SERIE"":""" & row("SERIE").ToString & """,")
                        resb.Append("""TIPO_DESC"":""" & row("TIPO_DESC").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "POSTCAJA" 'AGARCIA 09/03/2015
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = caja.ListaPOS(CODIGO, IIf(CTLG_CODE = Nothing, "", CTLG_CODE), IIf(SCSL_CODE = Nothing, "", SCSL_CODE))
                resb.Append("[")
                If Not (dt Is Nothing) Then
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                        resb.Append("""POST_DESCRIPCION"":""" & row("POST_DESCRIPCION").ToString & """,")
                        resb.Append("""POST_SERIE"":""" & row("POST_SERIE").ToString & """,")
                        resb.Append("""TIPO"":""" & row("TIPO").ToString & """,")
                        resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                End If
                resb.Append("]")
                resb.Replace("[{}]", "[]")
                res = resb.ToString()
            Case "NPOST" 'AGARCIA 09/03/2015
                context.Response.ContentType = "text/plain"
                Dim POST_CODE As String = context.Request("POST_CODE")
                res = caja.CrearPOSCaja(CODIGO, POST_CODE, USUA_ID)
            Case "RPOST" 'AGARCIA 10/03/2015
                context.Response.ContentType = "text/plain"
                res = caja.EliminarPOSCaja(CODIGO)
            Case "CE" 'AGARCIA 10/03/2015
                context.Response.ContentType = "text/plain"
                res = caja.CambiarEstadoCaja(CODIGO)
            Case "CAJRESP"
                ' Lista Usuarios Cajeros y/o Responsables
                ' INDICADOR => C= CAJEROS / R= RESPONSABLES / T = TODOS
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim dt As New DataTable
                dt = caja.ListarUsuarioCajeroResponsable(IIf(CTLG_CODE = Nothing, "", CTLG_CODE), IIf(ESTADO = Nothing, "", ESTADO), INDICADOR)
                If dt Is Nothing Then
                    res = "{}"
                Else
                    res = Utilities.DataTableToJSON(dt)
                End If
            Case "CAJASTODO" 'Lista Cajas cómo cajeros y responsables
                context.Response.ContentType = "application/text; charset=utf-8"
                Dim dtCajasCajero As New DataTable
                Dim dtCajasResponsable As New DataTable
                dtCajasCajero = caja.ListarCajasxUsuario(USUA_ID, IIf(CTLG_CODE = "TODOS", "", CTLG_CODE), IIf(SCSL_CODE = "TODOS", "", SCSL_CODE), "", IIf(ESTADO Is Nothing, "", ESTADO))
                dtCajasResponsable = caja.ListarCajasxUsuario("", IIf(CTLG_CODE = "TODOS", "", CTLG_CODE), IIf(SCSL_CODE = "TODOS", "", SCSL_CODE), USUA_ID, IIf(ESTADO Is Nothing, "", ESTADO))


                Dim oDTCajas As New DataTable
                If dtCajasCajero Is Nothing And dtCajasResponsable Is Nothing Then
                    res = "[]"
                ElseIf Not dtCajasCajero Is Nothing And dtCajasResponsable Is Nothing Then
                    oDTCajas = dtCajasCajero
                ElseIf dtCajasCajero Is Nothing And Not dtCajasResponsable Is Nothing Then
                    oDTCajas = dtCajasResponsable
                Else


                    dtCajasCajero.PrimaryKey = New DataColumn() {dtCajasCajero.Columns("CODE_CAJA"), dtCajasCajero.Columns("CAJERO")}
                    dtCajasResponsable.PrimaryKey = New DataColumn() {dtCajasResponsable.Columns("CODE_CAJA"), dtCajasResponsable.Columns("CAJERO")}


                    oDTCajas = dtCajasCajero
                    oDTCajas.Merge(dtCajasResponsable)
                End If

                res = GenerarTablaCajasxUsuario(oDTCajas)

        End Select
        context.Response.Write(res)

    End Sub

    Public Function GenerarTablaCajasxUsuario(ByVal dt As DataTable) As String


        res = ""
        resb.Clear()
        '------
        resb.AppendFormat("<table id=""tblCajasxUsuario"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>CAJERO</th>")
        resb.AppendFormat("<th>EMPRESA</th>")
        resb.AppendFormat("<th>SUCURSAL</th>")
        resb.AppendFormat("<th>CAJA</th>")
        resb.AppendFormat("<th>E°CAJERO</th>")
        resb.AppendFormat("<th>RESPONSABLE</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        If (dt Is Nothing) Then
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td style='text-align:center;'>NO HAY DATOS DISPONIBLES</td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("</tr>")
        Else
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CAJERO").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("EMPRESA").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("SUCURSAL").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("CAJA").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("ESTADO_CAJERO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RESPONSABLE_IND").ToString())

                resb.AppendFormat("</tr>")
            Next
        End If

        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
        Return res
    End Function



    Public Function GenerarTablaCajasxUsuario2(ByVal dt As DataTable) As String


        res = ""
        resb.Clear()
        '------
        resb.AppendFormat("<table id=""tblCajasxUsuario"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>RESPONSABLE</th>")
        resb.AppendFormat("<th>EMPRESA</th>")
        resb.AppendFormat("<th>SUCURSAL</th>")
        resb.AppendFormat("<th>CAJA</th>")
        resb.AppendFormat("<th>E°CAJERO</th>")
        resb.AppendFormat("<th>RESPONSABLE</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        If (dt Is Nothing) Then
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td style='text-align:center;'>NO HAY DATOS DISPONIBLES</td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("</tr>")
        Else
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RESP_ID").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("DESC_EMPRESA").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("DESC_SUCURSAL").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("DESCRIPCION").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("ESTADO_RESP").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("INDICADOR").ToString())
                resb.AppendFormat("</tr>")
            Next
        End If

        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
        Return res
    End Function


    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
