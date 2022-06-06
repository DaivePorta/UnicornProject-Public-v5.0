<%@ WebHandler Language="VB" Class="NALKARD" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NALKARD : Implements IHttpHandler

    Dim code As String
    Dim opcion As String
    Dim p_alamcen, p_grupo, p_scl, p_UNME_DET, p_TIPO, p_mone_code, p_prd, p_moneda, p_fecha, p_desde, p_hasta As String
    Dim total As Decimal
    Dim CODIGO, EMPRESA, ALMACEN, DESCRIPCION,
   TIPO_ALMACEN,
   TIPO_ALMACENAJE, ESTADO, USUARIO, SISTEMA_ALMACENAJE, PALETIZADO_IND, NRO_PALETS As String

    Dim dt As DataTable
    Dim dtp As DataTable
    Dim p As New Nomade.NA.NASeccionesAlmacen("bn")
    Dim gPro As New Nomade.NM.NMGestionProductos("BN")
    Dim res As String
    Dim resb As New StringBuilder
    Dim codempr As String
    Dim usua As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        'url: "vistas/na/ajax/NALKARD.ashx?OPCION=2&p_alamcen=" + $('#hf10').val() + "&p_scl=" + $('#cboEmpresas').val() + "&p_moneda=" + $('#slsMoneda').val() + "&p_prd=" + $('#hdcodProd').val(),

        opcion = context.Request("OPCION")
        code = context.Request("code")
        p_alamcen = context.Request("p_alamcen")
        p_grupo = context.Request("p_grupo")
        p_moneda = context.Request("p_moneda")
        p_scl = context.Request("p_scl") 'ESTO ES EMPRESA/CATALOGO, así nació 
        p_UNME_DET = context.Request("p_UNME_DET")
        p_TIPO = context.Request("p_TIPO")
        p_prd = context.Request("p_prd")
        CODIGO = context.Request("CODIGO")
        EMPRESA = context.Request("EMPRESA")
        ALMACEN = context.Request("ALMACEN")
        DESCRIPCION = context.Request("DESCRIPCION")
        TIPO_ALMACEN = context.Request("TIPO_ALMACEN")

        TIPO_ALMACENAJE = context.Request("TIPO_ALMACENAJE")
        total = 0

        ESTADO = context.Request("ESTADO")

        USUARIO = context.Request("USUARIO")

        SISTEMA_ALMACENAJE = context.Request("SISTEMA_ALMACENAJE")

        PALETIZADO_IND = context.Request("PALETIZADO_IND")
        'fecha
        p_desde = context.Request("p_desde")
        p_hasta = context.Request("p_hasta")

        p_fecha = context.Request("p_fecha")
        If p_fecha <> String.Empty Then
            p_fecha = Utilities.fechaLocal(context.Request("p_fecha"))
        End If

        NRO_PALETS = context.Request("NRO_PALETS")
        If (NRO_PALETS = String.Empty) Then
            NRO_PALETS = "0"
        End If

        codempr = context.Request("codempr")
        usua = context.Request("usua")

        Try
            Select Case opcion
                Case "1"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = gPro.LISTAR_PRODUCTO_NAMINSA(p_scl, "", "S", "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO_ANTIGUO"" :" & """" & MiDataRow("CODIGO_ANTIGUO").ToString & """,")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""UNIDAD"" :" & """" & MiDataRow("UNIDAD").ToString & """,")
                            resb.Append("""DESC_UNIDAD_DESPACHO"" :" & """" & MiDataRow("UNIDAD_DESC").ToString & """,")
                            resb.Append("""NO_SERIADA"" :" & """" & MiDataRow("NO_SERIADA").ToString & """,")
                            'resb.Append("""SERVICIO"" :" & """" & MiDataRow("SERVICIO").ToString & """,")
                            resb.Append("""DESC_ADM"" :" & """" & MiDataRow("DESC_ADM").ToString & """")
                            'resb.Append("""SERVICIO"" :" & """" & MiDataRow("SERVICIO").ToString & """,")
                            'resb.Append("""MANUFACTURADA"" :" & """" & MiDataRow("MANUFACTURADA").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "2"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dtp = gPro.LISTAR_KARDEX(p_prd, p_alamcen, p_moneda, p_scl, IIf(p_fecha = Nothing, String.Empty, p_fecha))
                    'GenerarTablaPro(dtp)
                    If Not dtp Is Nothing Then
                        res = Utilities.Datatable2Json(dtp)
                    Else
                        res = "[]"
                    End If
                Case "3" 'DPORTA
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dtp = gPro.LISTAR_KARDEX_2(p_prd, p_alamcen, p_moneda, p_scl, Utilities.fechaLocal(p_desde), Utilities.fechaLocal(p_hasta), IIf(p_fecha = Nothing, String.Empty, p_fecha))
                    'GenerarTablaPro(dtp)
                    If Not dtp Is Nothing Then
                        res = Utilities.Datatable2Json(dtp)
                    Else
                        res = "[]"
                    End If

                Case "4"

                Case "5"
            End Select

            context.Response.Write(res)

        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)

        End Try
    End Sub

    Public Function GenerarSelect(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then
            res += "["
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "{label:" & dt.Rows(i)(chtml).ToString() & ",title" & dt.Rows(i)(chtml).ToString() & "value" & dt.Rows(i)(cvalue).ToString() & "},"
            Next

            res += "]"
            res = res.Replace(",]", "]")
        Else
            res = "error"
        End If
        Return res
    End Function
    'ToString("##,#0.00");

    Public Function GenerarTablaPro(ByVal dt As DataTable) As String
        Dim ca_ent, pt, ca_sal, pt_sal, ca_tot, p_tot As Decimal
        res = "<table id=""tblbmodal""class='table table-bordered' style='width: 100%; border: 1px solid #cbcbcb;' cellpadding='6px'>"
        res += "<thead>"
        res += "<tr align=""center"">"
        res += "<th colspan=""5""></th>"
        res += "<th colspan=""3"" style='text-align: center'>ENTRADA</th>"
        res += "<th colspan=""3"" style='text-align: center'>SALIDA</th>"
        res += "<th colspan=""3"" style='text-align: center'>SALDOS</th>"
        res += "<th colspan=""2""></th>" 'Tipo de cambio
        res += "</tr>"
        res += "<tr>"
        res += "<th>ITEM</th>"
        res += "<th>FECHA</th>"
        res += "<th>PRODUCTO</th>"
        res += "<th style=""text-align: left"">DETALLE</th>"
        res += "<th>MONEDA</th>"
        res += "<th>CANT</th>"
        res += "<th>COSTO<br/>UNITARIO</th>"
        res += "<th>COSTO<br/>TOTAL</th>"
        res += "<th>CANT</th>"
        res += "<th>COSTO<br/>UNITARIO</th>"
        res += "<th>COSTO<br/>TOTAL</th>"
        res += "<th>CANT</th>"
        res += "<th>COSTO<br/>UNITARIO</th>"
        res += "<th>COSTO<br/>TOTAL</th>"
        res += "<th>TIPO CAMBIO</th>"
        res += "<th style='text-align: center'>#</th>"
        res += "</tr>"
        res += "</thead>"
        res += "<tbody>"
        Dim enlace As String
        If Not dt Is Nothing Then
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr >"
                res += "<td style='text-align: center'>" & dt.Rows(i)("ITEM").ToString & "</td>"
                res += "<td style='text-align: center' data-order='" + ObtenerFecha(dt.Rows(i)("FECHA").ToString) + "'>" & dt.Rows(i)("FECHA").ToString & "</td>"
                res += "<td style='text-align: center'>" & dt.Rows(i)("PRODUCTO").ToString & "</td>"
                res += "<td >" & dt.Rows(i)("DETALLE").ToString & "</td>"
                res += "<td style='text-align: center'>" & dt.Rows(i)("SIMBOLO").ToString & "</td>"
                res += "<td style='text-align: center' class='colorColumna'>" & FormatNumber(CDbl(dt.Rows(i)("CA_ENT").ToString), 2) & "</td>"
                res += "<td style='text-align: center' class='colorColumna'>" & FormatNumber(CDbl(dt.Rows(i)("PU_ENT").ToString), 2) & "</td>"
                res += "<td style='text-align: center' class='colorColumna'>" & FormatNumber(CDbl(dt.Rows(i)("PT_ENT").ToString), 2) & "</td>"
                res += "<td style='text-align: center'>" & FormatNumber(CDbl(dt.Rows(i)("CA_SAL").ToString), 2) & "</td>"
                res += "<td style='text-align: center'>" & FormatNumber(CDbl(dt.Rows(i)("PU_SAL").ToString), 2) & "</td>"
                res += "<td style='text-align: center'>" & FormatNumber(CDbl(dt.Rows(i)("PT_SAL").ToString), 2) & "</td>"
                res += "<td style='text-align: center' class='colorColumna'>" & FormatNumber(CDbl(dt.Rows(i)("CA_TOT").ToString), 2) & "</td>"
                res += "<td style='text-align: center' class='colorColumna'>" & FormatNumber(CDbl(IIf(CDbl(dt.Rows(i)("PU_TOT").ToString) > 0, dt.Rows(i)("PU_TOT").ToString, dt.Rows(i)("COSTO").ToString)), 2) & "</td>"
                res += "<td style='text-align: center' class='colorColumna'>" & FormatNumber(CDbl(dt.Rows(i)("PT_TOT").ToString), 2) & "</td>"
                res += "<td style='text-align: center'>" & FormatNumber(CDbl(dt.Rows(i)("TIPO_CAMBIO_KARDEX").ToString), 4) & "</td>"

                enlace = IIf(dt.Rows(i)("DCTO_REFERENCIA").ToString.Substring(0, 1) = "A",
                             "?f=naminsa&codigo=" & dt.Rows(i)("DCTO_REFERENCIA").ToString,
                             IIf(dt.Rows(i)("DCTO_REFERENCIA").ToString.Substring(0, 1) = "V",
                                 IIf(dt.Rows(i)("DETALLE").ToString <> "ANULACION DE VENTA",
                                     "?f=nvmdocv&codigo=" & dt.Rows(i)("DCTO_REFERENCIA").ToString,
                                     "?f=nvmanul&codigo=" & dt.Rows(i)("DCTO_REFERENCIA").ToString),
                                 If(dt.Rows(i)("TIPO_NOTA_CRED").ToString = "C",
                                    "?f=CAMNOPR&codigo=" & dt.Rows(i)("DCTO_REFERENCIA").ToString & "&codempr=" & dt.Rows(i)("CTLG_CODE").ToString,
                                    "?f=CAMNOCL&codigo=" & dt.Rows(i)("DCTO_REFERENCIA").ToString & "&codempr=" & dt.Rows(i)("CTLG_CODE").ToString)
                                )
                            )

                res += "<td style='text-align: center'><a style='padding: 7px' target='_blank' href='" & enlace & "' class='btn blue'><i class='icon-circle-arrow-right'></i></a></td>"
                res += "</tr>"
                ca_ent = ca_ent + dt.Rows(i)("CA_ENT")
                pt = pt + dt.Rows(i)("PT_ENT")

                ca_sal = ca_sal + dt.Rows(i)("CA_SAL")
                pt_sal = pt_sal + dt.Rows(i)("PT_SAL")

            Next

            ca_tot = FormatNumber(CDbl(dt.Rows(dt.Rows.Count - 1)("CA_TOT").ToString), 2)
            p_tot = FormatNumber(CDbl(dt.Rows(dt.Rows.Count - 1)("PT_TOT").ToString), 2)

            res += "</tbody>"
            res += "<tfoot>"
            res += "<tr>"
            res += "<th colspan=""4"" align='center'><b>TOTALES</b></th>"
            res += "<th align='center'></th>"
            res += "<th align='center' class='colorColumna'>" & FormatNumber(ca_ent, 2) & "</th>"
            res += "<th align='center' class='colorColumna'></th>"
            res += "<th align='center' class='colorColumna'>" & FormatNumber(pt, 2) & "</th>"
            res += "<th align='center'>" & FormatNumber(ca_sal, 2) & "</th>"
            res += "<th align='center'></th>"
            res += "<th align='center'>" & FormatNumber(pt_sal, 2) & "</th>"
            res += "<th align='center' class='colorColumna'>" & FormatNumber(ca_tot, 2) & "</th>"
            res += "<th align='center' class='colorColumna'></th>"
            res += "<th align='center' class='colorColumna'>" & FormatNumber(p_tot, 2) & "</th>"
            res += "<th align='center' colspan='2'></th>"
            res += "</tr>"

            res += "</tfoot>"
        End If

        res += "</table>"

        Return res
    End Function

    Function ObtenerFecha(ByVal fecha As String) As String
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
        Return fecha
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
        