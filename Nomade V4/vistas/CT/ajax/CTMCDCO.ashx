<%@ WebHandler Language="VB" Class="CTMCDCO" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Imports System.Drawing
Imports System.Drawing.Imaging

Public Class CTMCDCO : Implements IHttpHandler, System.Web.SessionState.IRequiresSessionState

    'Instanciamos las clases de Persona
    Dim nmGestionCTA As New Nomade.NB.NBCuentaContable("Bn")
    Dim P_CGRUPCTAS_OPERACION, P_CGRUPCTAS_CUENTA_SGRUP, P_CGRUPCTAS_IMPUESTO, P_CGRUPCTAS_CTAS_ID_IMPUESTO, P_CGRUPCTAS_CUENTA_IMPUESTO,
            P_CGRUPCTAS_CTAS_ID_OPE_MN, P_CGRUPCTAS_CUENTA_OPE_MN, P_CGRUPCTAS_CTAS_ID_OPE_ME, P_CGRUPCTAS_CUENTA_OPE_ME,
            P_CGRUPCTAS_CTAS_ID_RELA_OPE_MN, P_CGRUPCTAS_CUENTA_RELA_OPE_MN, P_CGRUPCTAS_CTAS_ID_RELA_OPE_ME,
            P_CGRUPCTAS_CUENTA_RELA_OPE_ME, P_CGRUPCTAS_CTAS_ID_RECEPCION_ANTI, P_CGRUPCTAS_CUENTA_RECEPCION_ANTI,
            P_CGRUPCTAS_CTAS_ID_APLICACION_ANTI, P_CGRUPCTAS_CUENTA_APLICACION_ANTI, P_CGRUPCTAS_DEBE_HABER, P_USUARIO, OPCION As String




    Dim Res As String
    Dim resb As New StringBuilder


    'Para usar el server-side processing DataTables
    Dim length, start, draw As Integer
    Dim searchTable As String
    Dim orderColumn, orderDir As String


    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        'context.Response.Write("Hello World")

        'Para usar el server-side processing DataTables
        length = context.Request("length")
        start = context.Request("start")
        draw = context.Request("draw")
        searchTable = context.Request("search[value]")
        orderColumn = context.Request("order[0][column]")
        orderDir = context.Request("order[0][dir]")




        P_CGRUPCTAS_OPERACION = context.Request("P_CGRUPCTAS_OPERACION")
        P_CGRUPCTAS_CUENTA_SGRUP = context.Request("P_CGRUPCTAS_CUENTA_SGRUP")
        P_CGRUPCTAS_IMPUESTO = context.Request("P_CGRUPCTAS_IMPUESTO")
        P_CGRUPCTAS_CTAS_ID_IMPUESTO = context.Request("P_CGRUPCTAS_CTAS_ID_IMPUESTO")
        P_CGRUPCTAS_CUENTA_IMPUESTO = context.Request("P_CGRUPCTAS_CUENTA_IMPUESTO")
        P_CGRUPCTAS_CTAS_ID_OPE_MN = context.Request("P_CGRUPCTAS_CTAS_ID_OPE_MN")
        P_CGRUPCTAS_CUENTA_OPE_MN = context.Request("P_CGRUPCTAS_CUENTA_OPE_MN")
        P_CGRUPCTAS_CTAS_ID_OPE_ME = context.Request("P_CGRUPCTAS_CTAS_ID_OPE_ME")
        P_CGRUPCTAS_CUENTA_OPE_ME = context.Request("P_CGRUPCTAS_CUENTA_OPE_ME")
        P_CGRUPCTAS_CTAS_ID_RELA_OPE_MN = context.Request("P_CGRUPCTAS_CTAS_ID_RELA_OPE_MN")
        P_CGRUPCTAS_CUENTA_RELA_OPE_MN = context.Request("P_CGRUPCTAS_CUENTA_RELA_OPE_MN")
        P_CGRUPCTAS_CTAS_ID_RELA_OPE_ME = context.Request("P_CGRUPCTAS_CTAS_ID_RELA_OPE_ME")
        P_CGRUPCTAS_CUENTA_RELA_OPE_ME = context.Request("P_CGRUPCTAS_CUENTA_RELA_OPE_ME")

        P_CGRUPCTAS_CTAS_ID_RECEPCION_ANTI = context.Request("P_CGRUPCTAS_CTAS_ID_RECEPCION_ANTI")
        P_CGRUPCTAS_CUENTA_RECEPCION_ANTI = context.Request("P_CGRUPCTAS_CUENTA_RECEPCION_ANTI")
        P_CGRUPCTAS_CTAS_ID_APLICACION_ANTI = context.Request("P_CGRUPCTAS_CTAS_ID_APLICACION_ANTI")
        P_CGRUPCTAS_CUENTA_APLICACION_ANTI = context.Request("P_CGRUPCTAS_CUENTA_APLICACION_ANTI")

        P_CGRUPCTAS_DEBE_HABER = context.Request("P_CGRUPCTAS_DEBE_HABER")
        P_USUARIO = HttpContext.Current.User.Identity.Name ' context.Request("P_USUARIO")

        OPCION = context.Request("OPCION")

        Select Case OPCION

            Case "G" 'REGISTRAR
                Try
                    Res = nmGestionCTA.PFS_REGISTRA_CTAS_CONTABLES(P_CGRUPCTAS_OPERACION, P_CGRUPCTAS_CUENTA_SGRUP, P_CGRUPCTAS_IMPUESTO,
                    P_CGRUPCTAS_CTAS_ID_IMPUESTO, P_CGRUPCTAS_CUENTA_IMPUESTO,
                    P_CGRUPCTAS_CTAS_ID_OPE_MN, P_CGRUPCTAS_CUENTA_OPE_MN, P_CGRUPCTAS_CTAS_ID_OPE_ME, P_CGRUPCTAS_CUENTA_OPE_ME,
                    P_CGRUPCTAS_CTAS_ID_RELA_OPE_MN, P_CGRUPCTAS_CUENTA_RELA_OPE_MN, P_CGRUPCTAS_CTAS_ID_RELA_OPE_ME,
                    P_CGRUPCTAS_CUENTA_RELA_OPE_ME, P_CGRUPCTAS_CTAS_ID_RECEPCION_ANTI, P_CGRUPCTAS_CUENTA_RECEPCION_ANTI,
                    P_CGRUPCTAS_CTAS_ID_APLICACION_ANTI, P_CGRUPCTAS_CUENTA_APLICACION_ANTI, P_CGRUPCTAS_DEBE_HABER, P_USUARIO)
                Catch ex As Exception
                    context.Response.Write(ex.ToString)
                End Try
            Case "L" 'listar

                Try
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.NM.NMGestionProductos("Bn")
                    Dim dt As New DataTable
                    Dim sb As New StringBuilder()

                    dt = nmGestionCTA.ListarConfiguracionCuentasContables(P_CGRUPCTAS_OPERACION)
                    'Res = GenerarTablaDocumento(dt)
                    'p = Nothing
                    If dt Is Nothing Then
                        Res = "[]"
                    Else
                        Res = Utilities.DataTableToJSON(dt)
                    End If
                Catch ex As Exception
                    context.Response.Write(ex.ToString)
                End Try
            Case Else

        End Select
        context.Response.Write(Res)



    End Sub

    Public Function GenerarTablaDocumento(ByVal dt As DataTable) As String
        Res = ""
        resb.Clear()
        '------
        resb.AppendFormat("<table id=""tblCtasContables"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>OPERACION</th>")
        resb.AppendFormat("<th>IMPUESTO</th>")
        'resb.AppendFormat("<th>CTA IMPUESTO<br/>EMISIÓN</th>")
        resb.AppendFormat("<th>CUENTA</th>")
        'resb.AppendFormat("<th'>CTA OPE MN</th>")
        resb.AppendFormat("<th>CUENTA MN</th>")
        'resb.AppendFormat("<th>CTA OPE ME</th>")
        resb.AppendFormat("<th>CUENTA ME<br/>PAGO</th>")
        'resb.AppendFormat("<th>CTA RELA MN<br/>PAGO</th>")
        resb.AppendFormat("<th>CUENTA RELA MN</th>")
        'resb.AppendFormat("<th'>CTA RELA ME</th>")
        resb.AppendFormat("<th>CUENTA RELA ME</th>")
        resb.AppendFormat("<th>DEBE HABER</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        If (dt IsNot Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CGRUPCTAS_OPERACION").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("CGRUPCTAS_IMPUESTO").ToString())
                'resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("CGRUPCTAS_CTAS_ID_IMPUESTO").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("CGRUPCTAS_CUENTA_IMPUESTO").ToString())
                ' resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("CGRUPCTAS_CTAS_ID_OPE_MN").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CGRUPCTAS_CUENTA_OPE_MN").ToString())
                'resb.AppendFormat("<td align='right' >{0}</td>", dt.Rows(i)("CGRUPCTAS_CTAS_ID_OPE_ME").ToString())
                resb.AppendFormat("<td align='right' >{0}</td>", dt.Rows(i)("CGRUPCTAS_CUENTA_OPE_ME").ToString())
                'resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("CGRUPCTAS_CTAS_ID_RELA_OPE_MN").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("CGRUPCTAS_CUENTA_RELA_OPE_MN").ToString())
                'resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("CGRUPCTAS_CTAS_ID_RELA_OPE_ME").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("CGRUPCTAS_CUENTA_RELA_OPE_ME").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("CGRUPCTAS_DEBE_HABER").ToString())
                resb.AppendFormat("</tr>")
            Next
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        Res = resb.ToString()
        Return Res
    End Function
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class