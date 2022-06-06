Imports System.Data

Partial Class vistas_NR_NRLGEPR

    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try
            Dim p As New Nomade.NC.NCEProveedor("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = p.ListarProveedor(0, String.Empty, String.Empty, String.Empty, "")

            If Not dt Is Nothing Then
                sb.Append("[")
                For Each row As DataRow In dt.Rows

                    sb.Append("{")

                    sb.Append("""RAZON_SOCIAL"":""" & row("RAZON_SOCIAL").ToString & """,")

                    sb.Append("""TIPO"":""" & row("TIPO").ToString & """,")

                    sb.Append("""CODIGO_TIPO_DOCUMENTO"":""" & row("CODIGO_TIPO_DOCUMENTO").ToString & """,")

                    sb.Append("""TIPO_DOCUMENTO"":""" & row("TIPO_DOCUMENTO").ToString & """,")

                    sb.Append("""NRO_DOCUMENTO"":""" & row("NRO_DOCUMENTO").ToString & """,")

                    sb.Append("""NRO_RUC"":""" & row("NRO_RUC").ToString & """,")

                    sb.Append("""CATE_DESC"":""" & row("CATE_DESC").ToString & """,")

                    sb.Append("""FECHA_INICIO"":{""display"":""" & row("FECHA_INICIO").ToString & """,""order"":""" & String.Join("", row("FECHA_INICIO").ToString.Split("/").Reverse()) & """},")

                    sb.Append("""EMPRESA"":{""NOMBRE"":""" & row("CTLG_DESC").ToString & """,""CODIGO"":""" & row("CTLG_CODE").ToString & """},")

                    sb.Append("""NICA_DESC"":""" & row("NICA_DESC").ToString & """,")

                    sb.Append("""DIRECCION"":""" & row("DIRECCION").ToString & """")

                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")
            End If

            hfObjPersona.Value = sb.ToString()

            p = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub



End Class
