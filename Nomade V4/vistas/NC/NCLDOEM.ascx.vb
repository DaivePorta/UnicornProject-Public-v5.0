Imports System.Data

Partial Class vistas_NC_NCLDOEM
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try
            Dim caja As New Nomade.NC.NCTipoDCEmpresa("BN")
            Dim dt As New DataTable
            Dim resb As New StringBuilder()

            dt = caja.ListarTipoDCEmpresa(String.Empty, String.Empty, String.Empty, String.Empty)
            If Not dt Is Nothing Then
                hfLISTA.Value = Utilities.Datatable2Json(dt)

                'resb.Append("[")
                'For Each row As DataRow In dt.Rows
                '    resb.Append("{")
                '    resb.Append("""CODE"":""" & row("CODE").ToString & """,")
                '    resb.Append("""CTLG_CODE"":""" & row("CTLG_CODE").ToString & """,")
                '    resb.Append("""EMPRESA"":""" & row("EMPRESA").ToString & """,")
                '    resb.Append("""DCTO_CODE"":""" & row("DCTO_CODE").ToString & """,")
                '    resb.Append("""SUNAT_CODE"":""" & row("SUNAT_CODE").ToString & """,")
                '    resb.Append("""DCTO_DESC"":""" & row("DCTO_DESC").ToString & """,")
                '    resb.Append("""TIPO_DOC"":""" & row("TIPO_DOC").ToString & """,")
                '    resb.Append("""GASTOS"":""" & row("GASTOS").ToString & """,")
                '    resb.Append("""ALMACEN"":""" & row("ALMACEN").ToString & """,")
                '    resb.Append("""COMPRA_VENTA"":""" & row("COMPRA_VENTA").ToString & """,")
                '    resb.Append("""FECHA_ELEC"":""" & Nomade.nomade.cutilidades.fechaMostrar(row("FECHA_ELEC").ToString) & """,")
                '    resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                '    resb.Append("},")
                'Next
                'resb.Append("+")
                'resb.Replace(",+", "")

                'resb.Append("]")
            End If

            'hfLISTA.Value = resb.ToString()

            caja = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub

End Class
