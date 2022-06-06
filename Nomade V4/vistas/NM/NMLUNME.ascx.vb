Imports System.Data
Partial Class vistas_NM_NMLUNME
    Inherits NOMADE.N.Cub

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Dim P As New Nomade.NM.NMUnidadMedida("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()
            dt = P.ListarUnidadesGeneral(String.Empty, String.Empty, String.Empty)
            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                    sb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                    sb.Append("""DESCRIPCION_INTERNACIONAL"":""" & row("DESCRIPCION_INTERNACIONAL").ToString & """,")
                    sb.Append("""UNME"":""" & row("UNME").ToString & """,")
                    sb.Append("""CODIGO_SUNAT"":""" & row("CODIGO_SUNAT").ToString & """,")
                    sb.Append("""UNIDAD_BASE"":""" & row("UNIDAD_BASE").ToString & """,")
                    sb.Append("""TIPO_UNIDAD"" :" & """" & row("TIPO_UNIDAD") & """,")
                    If row("ESTADO").ToString = "ACTIVO" Then
                        sb.Append("""ESTADO_IND"":""" & "A" & """,")
                    Else
                        sb.Append("""ESTADO_IND"":""" & "I" & """,")
                    End If
                    sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                    sb.Append("},")

                Next

                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")
            End If
            Me.hfObjJson.Value = sb.ToString()
            P = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub

End Class
