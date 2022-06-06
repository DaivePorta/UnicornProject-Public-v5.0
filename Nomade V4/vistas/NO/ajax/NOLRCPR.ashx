<%@ WebHandler Language="VB" Class="NOLRCPR" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NOLRCPR : Implements IHttpHandler


    Dim code As String
    Dim opcion As String
    Dim p_alamcen, p_grupo, p_scl, p_UNME_DET, p_TIPO, p_mone_code, p_prd, p_moneda As String
    Dim total As Decimal
    Dim CODIGO, EMPRESA, ALMACEN, DESCRIPCION,
   TIPO_ALMACEN,
   TIPO_ALMACENAJE, ESTADO, USUARIO, SISTEMA_ALMACENAJE, PALETIZADO_IND, NRO_PALETS, p_CTLG_CODE, p_SCSL_CODE As String


    Dim dt As DataTable
    Dim dtp As DataTable
    Dim p As New NOMADE.NA.NASeccionesAlmacen("bn")
    Dim gPro As New NOMADE.NM.NMGestionProductos("BN")
    Dim res As String
    Dim resb As New StringBuilder
    Dim Prod As New NOMADE.NM.NMGestionProductos("Bn")
    Dim report As New NOMADE.NA.NAReportes("Bn")
    Dim prov As New NOMADE.NC.NCEProveedor("Bn")
    Dim codempr As String
    Dim usua As String

    Dim p_pidm, NICA_CODE As String
    Dim p_desde As String
    Dim p_hasta As String
    Dim p_subgrupo As String
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        'url: "vistas/na/ajax/NALKARD.ashx?OPCION=2&p_alamcen=" + $('#hf10').val() + "&p_scl=" + $('#cboEmpresas').val() + "&p_moneda=" + $('#slsMoneda').val() + "&p_prd=" + $('#hdcodProd').val(),

        opcion = context.Request("OPCION")
        code = context.Request("code")
        p_alamcen = context.Request("p_alamcen")
        p_grupo = context.Request("p_grupo")
        p_moneda = context.Request("p_moneda")
        p_scl = context.Request("p_scl")
        p_UNME_DET = context.Request("p_UNME_DET")
        p_TIPO = context.Request("p_TIPO")
        p_prd = context.Request("p_prd")
        CODIGO = context.Request("CODIGO")
        EMPRESA = context.Request("EMPRESA")
        ALMACEN = context.Request("ALMACEN")
        DESCRIPCION = context.Request("DESCRIPCION")
        TIPO_ALMACEN = context.Request("TIPO_ALMACEN")

        NICA_CODE = context.Request("NICA_CODE")

        p_pidm = context.Request("p_pidm")
        p_desde = context.Request("p_desde")
        p_hasta = context.Request("p_hasta")
        p_subgrupo = context.Request("p_subgrupo")

        TIPO_ALMACENAJE = context.Request("TIPO_ALMACENAJE")
        total = 0

        ESTADO = context.Request("ESTADO")

        USUARIO = context.Request("USUARIO")

        SISTEMA_ALMACENAJE = context.Request("SISTEMA_ALMACENAJE")

        PALETIZADO_IND = context.Request("PALETIZADO_IND")

        NRO_PALETS = context.Request("NRO_PALETS")
        If (NRO_PALETS = String.Empty) Then
            NRO_PALETS = "0"
        End If

        codempr = context.Request("codempr")
        usua = context.Request("usua")

        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")





        Try

            Select Case opcion

                Case "1"

                    dt = report.LISTAR_REPORTE_COMPRAS_PROVEEDOR_RESUMEN(p_pidm, Utilities.fechaLocal(p_desde), Utilities.fechaLocal(p_hasta))
                    res = GenerarTablaPro(dt)

                Case "2"
                    dt = report.LISTAR_REPORTE_COMPRAS_PRODUCTO_PROVEEDOR(p_pidm, IIf(p_desde = String.Empty, Nothing, Utilities.fechaLocal(p_desde)),
                                                                         IIf(p_hasta = String.Empty, Nothing, Utilities.fechaLocal(p_hasta)), p_subgrupo, IIf(p_CTLG_CODE = Nothing, "", p_CTLG_CODE),
                                                                             IIf(p_SCSL_CODE = Nothing, "", p_SCSL_CODE))
                    res = GenerarTablaPro2(dt)
                Case "3"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = prov.ListarProveedor("0", "A", p_scl, If(NICA_CODE = Nothing, "", NICA_CODE), "N")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""RAZON_SOCIAL"" :" & """" & MiDataRow("RAZON_SOCIAL").ToString & """,")
                            resb.Append("""RUC"" :" & """" & MiDataRow("RUC").ToString & """,")
                            resb.Append("""DNI"" :" & """" & MiDataRow("DNI").ToString & """,")
                            resb.Append("""DIRECCION"" :" & """" & MiDataRow("DIRECCION").ToString & """,")
                            resb.Append("""ID"" :" & """" & MiDataRow("ID").ToString & """,")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "4"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim oDT As New DataTable()
                    oDT = report.LISTAR_REPORTE_PRODUCTO_PRECIOS_PROVEEDOR(p_pidm, IIf(p_prd = Nothing, "", p_prd), IIf(p_scl = Nothing, "", p_scl))
                    If oDT Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.DataTableToJSON(oDT)
                    End If

                Case "5"


                Case "LREP" 'Lista Reporte Resumen
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = report.LISTAR_REPORTE_COMPRAS_PROVEEDOR_RESUMEN(p_pidm, Utilities.fechaLocal(p_desde), Utilities.fechaLocal(p_hasta))
                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If


            End Select

            context.Response.Write(res)

        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)

        End Try
    End Sub


    'ToString("##,#0.00");

    Public Function GenerarTablaPro(ByVal dt As DataTable) As String
        Dim base, precioT, perc, montoTo As Decimal

        If Not dt Is Nothing Then
            res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"

            res += "<thead>"

            res += "<tr align=""center"">"

            res += "<th>DOCUMENTO</th>"
            res += "<th>EMISION</th>"
            res += "<th>VENCIMIENTO</th>"
            res += "<th>BASE IMPONIBLE</th>"
            res += "<th>PRECIO_TOTAL</th>"
            res += "<th>DETRACCION</th>"
            res += "<th>PERCEPION</th>"
            res += "<th>RETENCION</th>"
            res += "<th>MONTO TOTAL</th>"
            res += "</tr>"

            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr >"

                res += "<td align='center'>" & dt.Rows(i)("DOCUMENTO").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("EMISION").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("VENCIMIENTO").ToString() & "</td>"
                res += "<td align='center'>" & " S/" & dt.Rows(i)("BASE_IMPONIBLE").ToString() & "</td>"
                res += "<td align='center'>" & " S/" & dt.Rows(i)("PRECIO_TOTAL").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("DETRACCION").ToString() & "</td>"
                res += "<td align='center'>" & " S/" & dt.Rows(i)("PERCEPCION").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("RETENCION").ToString() & "</td>"
                res += "<td align='center'>" & " S/" & dt.Rows(i)("MONTO_TOTAL").ToString() & "</td>"

                res += "</tr>"
                base = base + dt.Rows(i)("BASE_IMPONIBLE").ToString()
                precioT = precioT + dt.Rows(i)("PRECIO_TOTAL").ToString()
                perc = perc + dt.Rows(i)("PERCEPCION").ToString()
                montoTo = montoTo + dt.Rows(i)("MONTO_TOTAL").ToString()



            Next
            res += "</tbody>"

            'res += "<tr >"
            'res += "<td align='center'></td>"
            'res += "<td align='center'></td>"
            'res += "<td align='center'></td>"
            'res += "<td align='center'>" & " S/" & base.ToString("##,#0.00") & "</td>"
            'res += "<td align='center' >" & " S/" & precioT.ToString("##,#0.00") & "</td>"
            'res += "<td align='center'></td>"
            'res += "<td align='center'>" & " S/" & perc.ToString("##,#0.00") & "</td>"
            'res += "<td align='center'></td>"
            'res += "<td align='center'>" & " S/" & montoTo.ToString("##,#0.00") & "</td>"
            'res += "</tr>"

            res += "</tbody>"

            res += "<tfoot>"
            res += "<tr >"
            res += "<th colspan=""3"" align='center'><b>TOTALES</b></th>"
            res += "<th align='center'>" & " S/" & base.ToString("##,#0.00") & "</th>"
            res += "<th align='center' >" & " S/" & precioT.ToString("##,#0.00") & "</th>"
            res += "<th align='center'></th>"
            res += "<th align='center'>" & " S/" & perc.ToString("##,#0.00") & "</th>"
            res += "<th align='center'></th>"
            res += "<th align='center'>" & " S/" & montoTo.ToString("##,#0.00") & "</th>"
            res += "</tr>"

            res += "</tfoot>"



            'res += "<tr >"
            'res += "<td align='center'></td>"
            'res += "<td ></td>"
            'res += "<td align='center' ></td>"
            'res += "<td align='center'></td>"
            'res += "<td align='center' ><b>TOTAL VALORIZADO</b></td>"
            'res += "<td align='center' ><b> " & total & "</b></td>"
            'res += "</tr>"


            res += "</table>"
        Else
            GenerarTablaProSinDatos()
        End If
        Return res
    End Function


    'Public Function GenerarTablaPro3(ByVal dt As DataTable) As String


    '    If Not dt Is Nothing Then
    '        res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"

    '        res += "<thead>"

    '        res += "<tr align=""center"">"

    '        res += "<th>CODIGO</th>"
    '        res += "<th>PROVEEDOR</th>"
    '        res += "<th>DESCRIPCION</th>"
    '        res += "<th>UNIDAD</th>"
    '        res += "<th>MONEDA</th>"
    '        res += "<th>PRECIO ULTIMO</th>"
    '        res += "<th>PRECIO MEDIO</th>"
    '        res += "</tr>"

    '        res += "</thead>"
    '        res += "<tbody>"
    '        For i As Integer = 0 To dt.Rows.Count - 1
    '            res += "<tr >"

    '            res += "<td align='center'>" & dt.Rows(i)("CODIGO_SAP").ToString() & "</td>"
    '            res += "<td align='center'>" & dt.Rows(i)("Persona").ToString() & "</td>"
    '            res += "<td align='left'>" & dt.Rows(i)("DESCRIPCION").ToString() & "</td>"
    '            res += "<td align='center'>" & dt.Rows(i)("UNIDAD").ToString() & "</td>"
    '            res += "<td align='center'>" & dt.Rows(i)("MONEDA").ToString() & "</td>"

    '            res += "<td align='center'>" & dt.Rows(i)("PRECIO_ULTIMO").ToString() & "</td>"
    '            res += "<td align='center'>" & dt.Rows(i)("PRECIO_PROMEDIO").ToString() & "</td>"

    '            res += "</tr>"
    '        Next
    '        res += "</tbody>"

    '        'res += "<tr >"
    '        'res += "<td align='center'></td>"
    '        'res += "<td ></td>"
    '        'res += "<td align='center' ></td>"
    '        'res += "<td align='center'></td>"
    '        'res += "<td align='center' ><b>TOTAL VALORIZADO</b></td>"
    '        'res += "<td align='center' ><b> " & total & "</b></td>"
    '        'res += "</tr>"


    '        res += "</table>"
    '    Else
    '        GenerarTablaProSinDatos()
    '    End If
    '    Return res
    'End Function




    Public Function GenerarTablaPro2(ByVal dt As DataTable) As String
        Dim valorCompra, volumenComprado, cantidadComprado As Decimal
        'display DTTT_selectable
        If Not dt Is Nothing Then
            res = "<table id=""tblbmodal"" class=""table-bordered"" border=""0"">"

            res += "<thead>"

            '  res += "<tr>"

            res += "<th>CODIGO</th>"
            res += "<th>CODIGO ANTIGUO</th>"
            res += "<th>DESCRIPCION</th>"
            res += "<th>UNIDAD</th>"
            res += "<th>CANTIDAD</th>"
            res += "<th>VOLUMEN</th>"
            res += "<th>VALOR COMPRA</th>"
            '   res += "</tr>"

            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr >"

                res += "<td align='center'>" & dt.Rows(i)("CODIGO_SAP").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("CODIGO_ANTIGUO").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("DESCRIPCION").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("UNIDAD").ToString() & "</td>"
                res += "<td align='right'>" & Convert.ToDecimal(dt.Rows(i)("CANTIDAD")).ToString("##,#0.00") & "</td>"
                res += "<td align='right'>" & Convert.ToDecimal(dt.Rows(i)("VOLUMEN_COMPRADO")).ToString("##,#0.00") & "</td>"
                res += "<td align='right'>" & " S/.   " & Convert.ToDecimal(dt.Rows(i)("VALOR_COMPRA")).ToString("##,#0.00") & "</td>"

                res += "</tr>"

                valorCompra = valorCompra + dt.Rows(i)("VALOR_COMPRA")
                volumenComprado = volumenComprado + dt.Rows(i)("VOLUMEN_COMPRADO")
                cantidadComprado = cantidadComprado + dt.Rows(i)("CANTIDAD")




            Next
            res += "</tbody>"



            res += "<tfoot>"
            res += "<tr >"
            res += "<th colspan=""4"" align='center'><b>TOTALES</b></th>"
            res += "<th align='right' >" & cantidadComprado.ToString("##,#0.00") & "</th>"
            res += "<th align='right' >" & volumenComprado.ToString("##,#0.00") & "</th>"
            res += "<th align='right'>" & " S/.   " & valorCompra.ToString("##,#0.00") & "</th>"
            res += "</tr>"

            res += "</tfoot>"





            res += "</table>"
        Else
            GenerarTablaProSinDatos()
        End If
        Return res
    End Function



    Public Function GenerarTablaProSinDatos() As String

        'res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"
        'res += "<tr >"
        'res += "<td></td>"
        'res += "</tr >"
        'res += "</table>"


        res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"
        res += "<thead>"
        res += "<tr align=""center"">"
        res += "<th>CODIGO</th>"
        res += "<th>CODIGO ANTIGUO</th>"
        res += "<th>DESCRIPCION</th>"
        res += "<th>UNIDAD</th>"
        res += "<th>CANTIDAD</th>"
        res += "<th>VALOR COMPRA</th>"
        res += "</tr>"
        res += "</thead>"
        res += "<tbody>"

        res += "<tr >"
        res += "<td align='center'> </td>"
        res += "<td ></td>"
        res += "<td align='center'></td>"
        res += "<td align='center' >NO HAY DATOS DISPONIBLES</td>"
        res += "<td align='center'></td>"
        res += "<td align='center'></td>"
        res += "</tr>"

        res += "</tbody>"
        res += "</table>"

        Return res
    End Function



    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class