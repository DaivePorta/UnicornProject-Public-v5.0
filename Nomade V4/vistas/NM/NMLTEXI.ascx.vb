Imports System.Data
Partial Class vistas_NM_NMLTEXI
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try

            Dim p As New Nomade.NM.NMTipodeExistencia("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()


            dt = p.Listar_Existencias(String.Empty, String.Empty, String.Empty, String.Empty)

            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                    sb.Append("""CODIGO_SUNAT"":""" & row("CODIGO_SUNAT").ToString & """,")
                    sb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                    sb.Append("""ESTADO_ID"":""" & row("ESTADO_ID").ToString & """,")
                    sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """,")
                    sb.Append("""ALMACENABLE_IND"":""" & row("ALMACENABLE_IND").ToString & """,")
                    sb.Append("""ALMACENABLE"":""" & row("ALMACENABLE").ToString & """")
                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")
            End If

            Me.hfObjTipoexistencias.Value = sb.ToString()
            p = Nothing
        Catch ex As Exception
            Response.Write("Error" & ex.ToString)
        End Try

    End Sub
End Class
