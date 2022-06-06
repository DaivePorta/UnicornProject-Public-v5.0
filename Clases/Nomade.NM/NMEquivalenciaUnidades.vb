Public Class NMEquivalenciaUnidades

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function ListarEquivalenciaUnMe(ByVal p_codigo As String, ByVal p_codigo_equiv As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFM_LISTAR_EQUI_UNME", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_UNME_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_UNME_CODE_EQUI", p_codigo_equiv, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



    Public Function ActualizarEquivalenciaUnMe(ByVal p_codigo As String, ByVal p_equivalencia As String,
                                    ByVal p_codigo_equi As String,
                                    ByVal p_user As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFM_ACTUALIZAR_EQUI_UNME", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EQUIVALENCIA", p_equivalencia, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_EQUI", p_codigo_equi, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearEquivalenciaUnMe(ByVal p_codigo As String, ByVal p_equivalencia As String,
                                    ByVal p_codigo_equi As String,
                                    ByVal p_user As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFM_CREAR_EQUI_UNME", CommandType.StoredProcedure)

           cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EQUIVALENCIA", p_equivalencia, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_EQUI", p_codigo_equi, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "ok"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


End Class
